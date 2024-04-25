const jwt = require("jsonwebtoken");
const UserActivation = require("../services/userService.js");
const BusinessActivation = require("../services/businessService.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decodes token and retrieves user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the decoded token has the correct property for user ID
      if (decoded && decoded.userId) {
        // Use the correct model here (UserActivation instead of uer)
        console.log(decoded);
        req.user = await UserActivation.getUserById(decoded.userId);
        req.business = await BusinessActivation.viewBusinessQuery(
          decoded.businessId
        );

        next();
      } else {
        res.status(401);
        throw new Error("Not authorized, invalid token payload");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});

module.exports = { protect };
