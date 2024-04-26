const db = require("../config/database");
const {
  createBusinessQuery,
  viewBusinessQuery,
  editBusinessQuery,
  deleteBusinessQuery,
  removeUserQuery,
  userBusinessQuery,
  getUserBusiness,
  viewUsersQuery,
  getSingleUserQuery,
  getBusinessByUser,
  getAllBusinesses,
} = require("../services/businessService");
const {
  createPermissionQuery,
  updatePermissionQuery,
} = require("../services/permissionService");
const { getUserById } = require("../services/userService");

//Get all Businesses
const getAllBusinesses = async (req, res) => {
  try {
    
    const businesses = await getAllBusinessesQuery(); 
    
    if (businesses.length === 0) {
      return res.status(404).json({ message: "No businesses found" });
    }

    res.json(businesses);
  } catch (error) {
    console.error("Error fetching all businesses:", error);
    res.status(500).json({ message: error });
  }
};

//Create Business
const createBusiness = async (req, res) => {
  const { adminId, phoneNumber, name, website } = req.body;

  try {
    if (!adminId || !name) {
      res.status(404).json({ message: "AdminId or name required" });
    }

    const businessData = {
      admin_id: adminId,
      website: website,
      phone_number: phoneNumber,
      name: name,
    };
    const result = await createBusinessQuery(businessData);
    res.json(result);
  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//View Business
const viewBusiness = async (req, res) => {
  const businessId = req.params.id;

  try {
    const result = await viewBusinessQuery(businessId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Business not found" });
    }
  } catch (error) {
    console.error("Error viewing business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Edit Business
const editBusiness = async (req, res) => {
  const { phone_number, business_name, business_website } = req.body;
  const businessId = req.params.id;

  if (!phone_number || !business_website || !business_name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingBusiness = await viewBusinessQuery(businessId);
    if (!existingBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

    const businessData = {
      phone_number,
      business_name,
      business_website,
    };

    const result = await editBusinessQuery(businessId, businessData);
    res.json(result);
  } catch (error) {
    console.error("Error editing business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete Business
const deleteBusiness = async (req, res) => {
  const businessId = req.params.id;

  try {
    const existingBusiness = await viewBusinessQuery(businessId);
    if (!existingBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }
    const result = await deleteBusinessQuery(businessId);
    res.json(result);
  } catch (error) {
    console.error("Error deleting business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addUsers = async (req, res) => {
  const { businessId, userId } = req.body;
  try {
    const business = await viewBusinessQuery(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUserBusiness = await getUserBusiness(businessId, userId);
    if (existingUserBusiness) {
      return res
        .status(400)
        .json({ message: "User already associated with the business" });
    }

    let permissionData = {
      role: "Viewer",
      description: "User can only view",
    };
    const permission = await createPermissionQuery(permissionData);
    await userBusinessQuery(businessId, userId, permission.id);
    res.status(200).json({ message: "User added to business successfully" });
  } catch (error) {
    console.error("Error adding user to business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeUsers = async (req, res) => {
  const { businessId, userId } = req.body;
  try {
    const business = await viewBusinessQuery(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await removeUserQuery(businessId, userId);
    res
      .status(200)
      .json({ message: "User removed from business successfully" });
  } catch (error) {
    console.error("Error removing user from business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsersFromBusiness = async (req, res) => {
  const businessId = req.params.business_id;
  console.log(businessId);
  try {
    const business = await viewBusinessQuery(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    const users = await viewUsersQuery(businessId);
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getSingleUser = async (req, res) => {
  const businessId = req.params.business_id;
  const userId = req.params.user_id;

  try {
    const business = await viewBusinessQuery(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const user = await getSingleUserQuery(businessId, userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changeUserPermission = async (req, res) => {
  const userId = req.params.user_id;
  const businessId = req.params.business_id;
  const { role, description } = req.body;

  try {
    const business = await viewBusinessQuery(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const user = await getSingleUserQuery(businessId, userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let permissionData = {
      userId: userId,
      businessId: businessId,
      role: role,
      description: description,
    };
    const result = await updatePermissionQuery(permissionData);
    res.json(result);
  } catch (error) {
    console.error("Error updating permision:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBusinessByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const businesses = await getBusinessByUser(userId);
    if (businesses.length === 0) {
      return res
        .status(404)
        .json({ message: "No businesses found for the user" });
    }
    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses by user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
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
};
