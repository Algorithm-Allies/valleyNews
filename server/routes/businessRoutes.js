const express = require("express");
const router = express.Router();

const {
  createBusiness,
  viewBusiness,
  editBusiness,
  deleteBusiness,
  addUsers,
  removeUsers,
  getUsersFromBusiness,
  getSingleUser,
} = require("../controllers/businessControllers");

router.post("/", createBusiness);
router.get("/:id", viewBusiness);
router.put("/:id", editBusiness);
router.delete("/:id", deleteBusiness);
router.post("/user/add", addUsers);
router.put("/user/remove/", removeUsers);
router.get("/users/:business_id", getUsersFromBusiness);
router.get("/:business_id/user/:user_id", getSingleUser);

module.exports = router;
