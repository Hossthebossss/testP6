
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const passwordSchema = require("../models/password");
const MaskData = require("maskdata");
exports.signup = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({
          message:
            "Please enter a password with at least 8 characters, including an upper letter, a lower letter and a number.",
        });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            const user = new User({
              email: MaskData.maskEmail2(req.body.email),
              password: hash,
            });
            user
              .save()
              .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error });
          });
      }
    };
    exports.login = (req, res, next) => {
        User.findOne({ email: MaskData.maskEmail2(req.body.email) })
          //Check if user (email used with signup) exists
          .then((user) => {
            if (!user) {
              return res.status(401).json({ error: "User not found!" });
            }
         
            bcrypt
              .compare(req.body.password, user.password)
              .then((valid) => {
                if (!valid) {
                  return res.status(401).json({ error: "Incorrect password !" });
                }
                
                res.status(200).json({
                  userId: user._id,
                  token: jwt.sign(
                    { userId: user._id },
                    process.env.RANDOM_TOKEN_SECRET,
                    {
                      expiresIn: "24h",
                    }
                  ),
                });
              })
              .catch((error) => res.status(500).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      };
