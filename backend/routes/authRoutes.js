const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refresh,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

module.exports = router;