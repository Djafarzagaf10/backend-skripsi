const express = require("express");
const { getAbsensiByUser } = require("../controllers/ControllerAbsensi");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.get("/:id", Authentication, getAbsensiByUser);

module.exports = router;
