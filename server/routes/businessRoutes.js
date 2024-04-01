const express = require("express");
const router = express.Router();

const {
  createBusiness,
  viewBusiness,
  editBusiness,
  deleteBusiness,
  addUsers,
  removeUsers,
  addArticles,
  removeArticles,
} = require("../controllers/businessControllers");

router.post("/", createBusiness);
router.get("/:id", viewBusiness);
router.put("/:id", editBusiness);
router.delete("/:id", deleteBusiness);
router.post("/user/add", addUsers);
router.put("/user/remove", removeUsers);
router.post("/article/add", addArticles);
router.put("/article/remove", removeArticles);

module.exports = router;
