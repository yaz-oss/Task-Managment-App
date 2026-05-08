const User = require("../models/User");
const Task = require("../models/Task");

exports.getUsers = async (req, res) => {

  try {

    const users = await User.findAll({
      include: [Task],
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.deleteUser = async (req, res) => {

  try {

    const user =
    await User.findByPk(
      req.params.id
    );

    if (!user) {

      return res.status(404)
      .json({
        message: "User not found",
      });
    }

    await Task.destroy({
      where: {
        UserId: user.id,
      },
    });

    await user.destroy();

    res.json({
      message:
      "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.blockUser = async (req, res) => {

  try {

    const user =
    await User.findByPk(
      req.params.id
    );

    if (!user) {

      return res.status(404)
      .json({
        message: "User not found",
      });
    }

    user.blocked =
    !user.blocked;

    await user.save();

    res.json({
      message:
      user.blocked
      ? "User blocked"
      : "User unblocked",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });
  }
};