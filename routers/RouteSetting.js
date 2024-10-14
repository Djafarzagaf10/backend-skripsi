const express = require("express");
const {
  updateSetting,
  createSetting,
  getSetting,
} = require("../controllers/ControllerSetting");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/", Authentication, createSetting);
router.put("/:id", Authentication, updateSetting);
router.get("/:id", Authentication, getSetting);

module.exports = router;
