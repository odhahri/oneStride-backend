const express = require("express");
const path = require("path");
global.__basedir = path.resolve("../");
const apiurls = require("../src/apiurls");
const app = express();
const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const config = require("./config");
dotenv.config();

const env = process.env.NODE_ENV || "development";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", apiurls);



app.listen(process.env.PORT, () => {
  console.log(`server listening in port ${process.env.PORT}`);
});
