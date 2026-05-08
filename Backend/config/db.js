const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tasks_db","postgres","yaz",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

module.exports = sequelize;