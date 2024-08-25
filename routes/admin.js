/**
 * @desc Admin routes
 */

const isAdmin = require("../middleware/adminMiddleware");

const User = require("../models/User");

const express = require("express");
const router = express.Router();

/**
 * @route GET /admin/is-admin
 * @desc Check if user is an admin
 */
router.get("/is-admin", isAdmin, (req, res) => {
  return res.status(200).json({ message: "You are an admin", isAdmin: true });
});

/**
 * @route GET /admin/users
 * @desc Get all users with their roles
 */
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in getting all users", error });
  }
});

exports = module.exports = router;
