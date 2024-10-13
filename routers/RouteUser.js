const express = require("express");
const {
  createUser,
  loginUser,
  removeToken,
  getUserLogin,
  changePassword,
  getUserById,
  updateUser,
} = require("../controllers/ControllerUser");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/", Authentication, createUser);
router.patch("/edit-data/:id", Authentication, updateUser);
router.delete("/:id", removeToken);
router.post("/login", loginUser);
router.get("/:id", Authentication, getUserLogin);
router.patch("/change-password/:id", Authentication, changePassword);
router.get("/get-data/:id", Authentication, getUserById);

module.exports = router;
