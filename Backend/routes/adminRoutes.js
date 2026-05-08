// Backend/routes/adminRoutes.js

const express = require("express");

const router = express.Router();

const User = require("../models/User");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/users",

  authMiddleware,

  async (req, res) => {

    try {

      const users =
        await User.findAll();

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch users",
      });
    }
  }
);

router.get(
  "/tasks",

  authMiddleware,

  async (req, res) => {

    try {

      const tasks =
        await Task.findAll();

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch tasks",
      });
    }
  }
);

router.delete(
  "/user/:id",

  authMiddleware,

  async (req, res) => {

    try {

      await User.destroy({

        where: {
          id:
            req.params.id,
        },
      });

      res.json({
        message:
          "User deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Delete failed",
      });
    }
  }
);

router.put(
  "/block/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const user =
        await User.findByPk(
          req.params.id
        );

      if (!user) {

        return res.status(404)
        .json({
          message:
            "User not found",
        });
      }

      user.blocked =
        !user.blocked;

      await user.save();

      res.json({
        message:
          "User updated",
      });

    } catch (error) {

      res.status(500)
      .json({
        message:
          "Block failed",
      });
    }
  }
);

module.exports = router;