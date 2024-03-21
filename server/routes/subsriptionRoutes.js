const express = require("express");
const router = express.Router();

const {
  addSubscription,
  getSubscription,
  editSubscription,
  deleteSubscription,
} = require("../controllers/subscriptionControllers");

router.post("/:id", addSubscription);
router.get("/:id", getSubscription);
router.put("/:id", editSubscription);
router.delete("/:id", deleteSubscription);

module.exports = router;
