// Backend/routes/authRoutes.js

const express =
require("express");

const jwt =
require("jsonwebtoken");

const router =
express.Router();

const User =
require("../models/User");

router.post(
  "/register",

  async (req, res) => {

    try {

      const {
        username,
        email,
        password,
      } = req.body;

      const existingUser =
        await User.findOne({

          where: {
            email,
          },
        });

      if (existingUser) {

        return res.status(400)
        .json({
          message:
            "Email already exists",
        });
      }

      let role = "user";

      if (
        email ===
        "ishimweyaziid749@gmail.com"
      ) {

        role = "admin";
      }

      await User.create({

        username,
        email,
        password,
        role,
      });

      res.json({
        message:
          "Registration successful",
      });

    } catch (error) {

      res.status(500)
      .json({
        message:
          "Registration failed",
      });
    }
  }
);

router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({

          where: {
            email,
          },
        });

      if (!user) {

        return res.status(404)
        .json({
          message:
            "User not found",
        });
      }

      if (
        user.password !==
        password
      ) {

        return res.status(400)
        .json({
          message:
            "Invalid credentials",
        });
      }

      if (user.blocked) {

        return res.status(403)
        .json({
          message:
            "You are blocked by admin",
        });
      }

      const token =
        jwt.sign(

          {
            id: user.id,
            role: user.role,
          },

          "SECRET_KEY"
        );

      res.json({

        token,

        username:
          user.username,

        role:
          user.role,
      });

    } catch (error) {

      res.status(500)
      .json({
        message:
          "Login failed",
      });
    }
  }
);

module.exports =
router;