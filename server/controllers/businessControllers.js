const db = require("../config/database");
const {
  createBusinessQuery,
  viewBusinessQuery,
  editBusinessQuery,
  deleteBusinessQuery,
} = require("../services/businessService");

//Create Business
const createBusiness = async (req, res) => {
  const { adminId, address, phoneNumber, email, name } = req.body;

  try {
    if (!adminId || !name) {
      res.status(404).json({ message: "AdminId or name required" });
    }
    // Execute the SQL query to insert a new business into the database

    const businessData = {
      admin_id: adminId,
      address: address,
      phone_number: phoneNumber,
      email: email,
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
  const { phoneNumber, email, address, name } = req.body;
  const businessId = req.params.id;

  if (!phoneNumber || !email || !address || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingBusiness = await viewBusinessQuery(businessId);
    if (!existingBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

    const businessData = {
      phoneNumber,
      email,
      address,
      name,
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

//Add users to Business

//Remove users from Business

//Add articles to Business

//Edit articles from Businessw

//Remove articles from Business

module.exports = {
  createBusiness,
  viewBusiness,
  editBusiness,
  deleteBusiness,
};
