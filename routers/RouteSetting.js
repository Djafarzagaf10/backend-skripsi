const express = require("express");
const { updateSetting, createSetting } = require("../controllers/ControllerSetting");

const router = express.Router();

router.post("/", createSetting);
router.patch("/:id", updateSetting);

module.exports = router;
