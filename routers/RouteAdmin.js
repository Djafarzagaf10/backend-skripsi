const express = require("express");
const {
  createAdmin,
  loginAdmin,
  removeToken,
  getKehadiran,
  getUser,
} = require("../controllers/ControllerAdmin");
const Authentication = require("../middleware/Authentication");
const { updateSetting } = require("../controllers/ControllerSetting");

const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.delete("/remove-token/:id", removeToken);
router.post("/kehadiran", Authentication, getKehadiran);
router.get("/get-user", Authentication, getUser);

module.exports = router;
