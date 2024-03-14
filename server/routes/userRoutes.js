const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifiy,
  passwordResetEmail,
  resetPassword,
} = require("../controllers/userControllers");

router.get("/", (req, res) => {});
router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifiy);
router.post("/password-reset-email", passwordResetEmail);
router.post("/reset-password", resetPassword);

router.get("/logout", (req, res) => {});

module.exports = router;
