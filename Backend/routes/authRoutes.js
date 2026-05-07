const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");



// REGISTER

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
          where: { email },
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "Email already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const totalUsers =
        await User.count();

      let role = "user";

      if (totalUsers === 0) {

        role = "admin";
      }

      const user =
        await User.create({
          username,
          email,
          password:
            hashedPassword,
          role,
        });

      res.json({
        message:
          "Account created",

        user,
      });

    } catch (error) {

      res.status(500).json(error);
    }
  }
);



// LOGIN

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
          where: { email },
        });

      if (!user) {

        return res.status(400).json({
          message:
            "User not found",
        });
      }

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!validPassword) {

        return res.status(400).json({
          message:
            "Wrong password",
        });
      }

      const token =
        jwt.sign(
          {
            id: user.id,
            role: user.role,
          },

          "secretkey"
        );

      res.json({
        token,

        user: {
          id: user.id,
          username:
            user.username,
          email:
            user.email,
          role:
            user.role,
        },
      });

    } catch (error) {

      res.status(500).json(error);
    }
  }
);

module.exports = router;