const db = require("../config/database");
const { getUserById } = require("../services/userService");
const { subscribeUser } = require("../services/subscribeService");
const subscription = async (req, res) => {
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

module.exports = {
  subscription,
};
