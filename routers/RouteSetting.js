const express = require("express");
const { updateSetting, createSetting } = require("../controllers/ControllerSetting");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/", Authentication,createSetting);
router.put("/:id", updateSetting);

module.exports = router;
