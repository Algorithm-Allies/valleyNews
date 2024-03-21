const db = require("../config/database");
const { getUserById } = require("../services/userService");
const {
  subscribeUser,
  getSubscriptionInfo,
  editSubscriptionInfo,
  deleteSubscriptionInfo,
} = require("../services/subscribeService");

const addSubscription = async (req, res) => {
  const { category, frequency, delivery_method } = req.body;
  const user_id = req.params.id;

  try {
    if (!category || !frequency || !delivery_method) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const realUser = await getUserById(user_id);
    if (!realUser) {
      return res
        .status(400)
        .json({ message: `User with ID ${user_id} does not exist` });
    }

    const subData = {
      category,
      frequency,
      delivery_method,
      user_id,
    };
    const subscribed = await subscribeUser(subData);

    res.status(200).json(subscribed);
  } catch (error) {
    console.error("Error subscribing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSubscription = async (req, res) => {
  const user_id = req.params.id;
  try {
    const subscriptionInfo = await getSubscriptionInfo(user_id);
    if (!subscriptionInfo || subscriptionInfo.length === 0) {
      return res
        .status(404)
        .json({ message: "Subscription not found for the user" });
    }
    res.status(200).json(subscriptionInfo);
  } catch (error) {
    console.error("Error getting subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editSubscription = async (req, res) => {
  const user_id = req.params.id;
  const { category, frequency, delivery_method } = req.body;
  try {
    const updatedSubscription = await editSubscriptionInfo({
      user_id,
      category,
      frequency,
      delivery_method,
    });
    res.status(200).json(updatedSubscription);
  } catch (error) {
    console.error("Error editing subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSubscription = async (req, res) => {
  const user_id = req.params.id;
  try {
    const deletedSubscription = await deleteSubscriptionInfo(user_id);
    res.status(200).json(deletedSubscription);
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addSubscription,
  getSubscription,
  editSubscription,
  deleteSubscription,
};
