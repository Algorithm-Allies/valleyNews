const express = require("express");
const router = express.Router();

const { subscription } = require("../controllers/subscriptionControllers");

router.post("/:id", subscription);

module.exports = router;
