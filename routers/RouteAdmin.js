const express = require("express");
const {
  createAdmin,
  loginAdmin,
  removeToken,
  getKehadiran,
  getUser,
  getAdminLogin,
  deleteUser,
} = require("../controllers/ControllerAdmin");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.delete("/remove-token/:id", removeToken);
router.post("/kehadiran", Authentication, getKehadiran);
router.get("/get-user", Authentication, getUser);
router.get("/:id", Authentication, getAdminLogin);
router.delete("/user-delete/:id", Authentication, deleteUser);

module.exports = router;
