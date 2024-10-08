const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "railway",
  username: "root",
  password: "yzzNjVRPfAmZHGCBDawzrbgfkwJALJYL",
  host: "mysql.railway.internal",
  dialect: "mysql",
});

module.exports = db;
