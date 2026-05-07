const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = require("./User");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
  },

  description: {
    type: DataTypes.TEXT,
  },

  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Task);

Task.belongsTo(User);

module.exports = Task;