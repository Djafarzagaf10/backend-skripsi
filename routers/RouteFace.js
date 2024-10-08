const express = require("express");
const { createFace } = require("../controllers/ControllerFace");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.patch("/:id", Authentication, createFace);

module.exports = router;
