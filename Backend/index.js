const express = require("express");

const cors = require("cors");

const sequelize = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use("/api/auth", authRoutes);

sequelize.sync().then(() => {

  app.listen(5000, () => {

    console.log(
      "Server running on port 5000"
    );
  });
});