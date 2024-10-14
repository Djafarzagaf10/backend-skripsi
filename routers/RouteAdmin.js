const express = require("express");
const {
  createAdmin,
  loginAdmin,
  removeToken,
  getKehadiran,
  getUser,
  getAdminLogin,
  deleteUser,
  changePassword,
} = require("../controllers/ControllerAdmin");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.delete("/remove-token/:id", removeToken);
router.get("/kehadiran", Authentication, getKehadiran);
router.get("/get-user", Authentication, getUser);
router.get("/:id", Authentication, getAdminLogin);
router.delete("/user-delete/:id", Authentication, deleteUser);
router.put("/change-password/:id", Authentication, changePassword);

module.exports = router;
