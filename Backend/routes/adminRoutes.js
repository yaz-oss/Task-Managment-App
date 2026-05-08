const express =
require("express");

const router =
express.Router();

const {
  getUsers,
  deleteUser,
  blockUser,
} = require(
  "../controllers/adminController"
);

const authMiddleware =
require("../middleware/authMiddleware");

router.get(
  "/users",
  authMiddleware,
  getUsers
);

router.delete(
  "/user/:id",
  authMiddleware,
  deleteUser
);

router.put(
  "/user/:id/block",
  authMiddleware,
  blockUser
);

module.exports =
router;