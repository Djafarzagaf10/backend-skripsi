const express = require("express");
const {
  createUser,
  loginUser,
  removeToken,
  getUserLogin,
  changePassword,
} = require("../controllers/ControllerUser");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/", Authentication, createUser);
router.delete("/:id", removeToken);
router.post("/login", loginUser);
router.get("/:id", Authentication, getUserLogin);
router.patch("/change-password/:id", Authentication, changePassword);

module.exports = router;
