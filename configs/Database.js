const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "railway",
  username: "root",
  password: "yzzNjVRPfAmZHGCBDawzrbgfkwJALJYL",
  host: "mysql.railway.internal",
  dialect: "mysql",
});
// const db = new Sequelize({
//   database: "db_inspektorat",
//   username: "root",
//   password: "",
//   host: "localhost",
//   dialect: "mysql",
// });

module.exports = db;
