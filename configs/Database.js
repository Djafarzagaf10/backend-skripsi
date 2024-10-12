const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "db_inspektorat",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
