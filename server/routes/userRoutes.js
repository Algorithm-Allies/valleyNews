const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userControllers");

router.get("/", (req, res) => {});
router.post("/login", login);
router.post("/register", register);
router.get("/logout", (req, res) => {});

module.exports = router;
