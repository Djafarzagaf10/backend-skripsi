const express = require("express");
const { getAbsensiByUser, pengajuanAbsensi } = require("../controllers/ControllerAbsensi");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.get("/:id", Authentication, getAbsensiByUser);
router.post("/", Authentication, pengajuanAbsensi);

module.exports = router;
