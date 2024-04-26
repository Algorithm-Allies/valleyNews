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
  changeUserPermission,
  getBusinessByUserId,
  getAllBusinesses,
} = require("../controllers/businessControllers");

router.post("/", createBusiness);
router.get("/:id", viewBusiness);
router.put("/:id", editBusiness);
router.delete("/:id", deleteBusiness);
router.post("/user/add", addUsers);
router.put("/user/remove/", removeUsers);
router.get("/users/:business_id", getUsersFromBusiness);
router.get("/:business_id/user/:user_id", getSingleUser);
router.put("/:business_id/user/:user_id", changeUserPermission);
router.get("/user_id/:id", getBusinessByUserId);

router.get("/businesses", getAllBusinesses);

// Add the test route
router.get("/businessTest", (req, res) => {
  res.status(200).json({ message: "Test successful!" });
});
module.exports = router;
