const User =
require("../models/user");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

exports.register =
async (req, res) => {

  try {

    const {
      username,
      email,
      password,
    } = req.body;

    const existingUser =
    await User.findOne({
      where: { email },
    });

    if (existingUser) {

      return res.status(400)
      .json({
        message:
        "Email already exists",
      });
    }

    const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

    let role = "user";

    if (
      process.env.ADMIN_EMAIL &&
      email.toLowerCase() ===
      process.env.ADMIN_EMAIL.toLowerCase()
    ) {

      role = "admin";
    }

    await User.create({

      username,
      email,

      password:
      hashedPassword,

      role,
    });

    res.json({
      message:
      "Registration successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500)
    .json({
      message:
      "Server error",
    });
  }
};

exports.login =
async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
    await User.findOne({
      where: { email },
    });

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
        "You are blocked by admin",
      });
    }

    const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400)
      .json({
        message:
        "Invalid password",
      });
    }

    const token =
    jwt.sign(

      {
        id: user.id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.json({

      token,

      username:
      user.username,

      role:
      user.role,
    });

  } catch (error) {

    console.log(error);

    res.status(500)
    .json({
      message:
      "Server error",
    });
  }
};
