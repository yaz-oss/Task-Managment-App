// Backend/middleware/authMiddleware.js

const jwt =
require("jsonwebtoken");

const User =
require("../models/User");

const authMiddleware =
async (
  req,
  res,
  next
) => {

  try {

    const token =
      req.header(
        "Authorization"
      );

    if (!token) {

      return res.status(401)
      .json({
        message:
          "No token",
      });
    }

    const verified =
      jwt.verify(
        token,
        "SECRET_KEY"
      );

    const user =
      await User.findByPk(
        verified.id
      );

    if (!user) {

      return res.status(404)
      .json({
        message:
          "User not found",
      });
    }

    if (user.blocked) {

      return res.status(403)
      .json({
        message:
          "Blocked by admin",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    res.status(401)
    .json({
      message:
        "Unauthorized",
    });
  }
};

module.exports =
authMiddleware;