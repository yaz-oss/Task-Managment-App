const Task = require("../models/Task");

const User = require("../models/User");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        UserId: req.user.id,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createTask = async (
  req,
  res
) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description:
        req.body.description,

      UserId: req.user.id,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findByPk(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.update(req.body);

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findByPk(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.destroy();

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const adminGetAllTasks = async (
  req,
  res
) => {
  try {
    const tasks = await Task.findAll({
      include: User,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  adminGetAllTasks,
};