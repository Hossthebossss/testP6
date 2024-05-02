const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to MongoDB successful !"))
  .catch(() => console.log("Connection to MongoDB failed !"));
  app.use(
    helmet({
  
      crossOriginResourcePolicy: false,
    })
  );
  
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  
  app.use(express.json());
  app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
module.exports = app;