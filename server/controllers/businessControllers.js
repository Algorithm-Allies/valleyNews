const db = require("../config/database");
const {
  createBusinessQuery,
  viewBusinessQuery,
  editBusinessQuery,
  deleteBusinessQuery,
  addUserQuery,
  removeUserQuery,
  addArticleQuery,
  removeArticleQuery,
} = require("../services/businessService");

//Create Business
const createBusiness = async (req, res) => {
  const { adminId, address, phoneNumber, email, name } = req.body;

  try {
    if (!adminId || !name) {
      res.status(404).json({ message: "AdminId or name required" });
    }

    const businessData = {
      admin_id: adminId,
      address: address,
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
    await addUserQuery(businessId, userId);
    res.status(200).json({ message: "User added to business successfully" });
  } catch (error) {
    console.error("Error adding user to business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeUsers = async (req, res) => {
  const { businessId, userId } = req.body;
  try {
    await removeUserQuery(businessId, userId);
    res
      .status(200)
      .json({ message: "User removed from business successfully" });
  } catch (error) {
    console.error("Error removing user from business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addArticles = async (req, res) => {
  const { businessId, articleId } = req.body;
  try {
    await addArticleQuery(businessId, articleId);
    res.status(200).json({ message: "Article added to business successfully" });
  } catch (error) {
    console.error("Error adding article to business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeArticles = async (req, res) => {
  const { businessId, articleId } = req.body;
  try {
    await removeArticleQuery(businessId, articleId);
    res
      .status(200)
      .json({ message: "Article removed from business successfully" });
  } catch (error) {
    console.error("Error removing article from business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBusiness,
  viewBusiness,
  editBusiness,
  deleteBusiness,
  addUsers,
  removeUsers,
  addArticles,
  removeArticles,
};
