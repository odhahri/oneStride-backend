const express = require("express");
const apiurls = require("../src/apiurls");
const app = express();
const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const config = require("./config");
dotenv.config();

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

app.use(express.json());
app.use("/api/v1", apiurls);
app.listen(process.env.PORT, () => {
  console.log(`server listening in port ${process.env.PORT}`);
});
