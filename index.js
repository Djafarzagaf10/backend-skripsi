const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./configs/Database");
const fileUpload = require("express-fileupload");
// const ModelCreate = require("./models/ModelSetting");
const path = require("path");

const RouteUser = require("./routers/RouteUser");
const RouteFace = require("./routers/RouteFace");
const RouteAbsensi = require("./routers/RouteAbsensi");

dotenv.config();

const app = express();

try {
  db.authenticate();
  console.log("Database connected....");
  // ModelCreate.sync();
  db.sync()
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(fileUpload());

app.use("/user", RouteUser);
app.use("/face", RouteFace);
app.use("/absensi", RouteAbsensi);

app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(5001, () => console.log("Server running at port 5001"));
