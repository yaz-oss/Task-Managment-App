const express =
require("express");

const cors =
require("cors");

const sequelize =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const taskRoutes =
require("./routes/taskRoutes");

const adminRoutes =
require("./routes/adminRoutes");

require("./models/User");

require("./models/Task");

const app =
express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

sequelize.sync()
.then(() => {

  app.listen(
    5000,

    () => {

      console.log(
        "Server running on port 5000"
      );
    }
  );
});