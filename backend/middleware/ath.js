const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verified = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = verified.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Unauthenticated request!" });
  }
};