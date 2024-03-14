const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifiy,
  resetEmail,
  resetPassword,
} = require("../controllers/userControllers");

router.get("/", (req, res) => {});
router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifiy);
router.post("/reset-email", resetEmail);
router.post("/reset-password", resetPassword);

router.get("/logout", (req, res) => {});

module.exports = router;
