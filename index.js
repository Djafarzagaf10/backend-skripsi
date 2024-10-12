const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./configs/Database");
const fileUpload = require("express-fileupload");
// const ModelCreate = require("./models/ModelAdmin");
const path = require("path");

const RouteUser = require("./routers/RouteUser");
const RouteSetting = require("./routers/RouteSetting");
const RouteFace = require("./routers/RouteFace");
const RouteAbsensi = require("./routers/RouteAbsensi");
const RouteAdmin = require("./routers/RouteAdmin");

require("dotenv").config();

const app = express();

try {
  db.authenticate();
  console.log("Database connected....");
  // ModelCreate.sync();
  // db.sync()
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
app.use("/setting", RouteSetting);
app.use("/admin", RouteAdmin);

app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(8000, () => console.log("Server running at port 8000...."));
