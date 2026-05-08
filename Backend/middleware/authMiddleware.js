const jwt = require("jsonwebtoken");

module.exports = async (
  req,
  res,
  next
) => {

  try {

    const token =
    req.headers.authorization;

    if (!token) {

      return res.status(401)
      .json({
        message: "No token",
      });
    }

    const decoded =
    jwt.verify(
      token,
      "SECRETKEY"
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token",
    });
  }
};