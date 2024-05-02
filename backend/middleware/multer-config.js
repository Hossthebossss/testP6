const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0].split(" ").join("_");
    callback(null, name + Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage }).single("image");