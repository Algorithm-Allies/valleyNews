const express = require("express");
const router = express.Router();

const {
  createBusiness,
  viewBusiness,
  editBusiness,
  deleteBusiness,
} = require("../controllers/businessControllers");

router.post("/", createBusiness);
router.get("/:id", viewBusiness);
router.put("/:id", editBusiness);
router.delete("/:id", deleteBusiness);

module.exports = router;
