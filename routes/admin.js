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

/**
 * @route GET /admin/users/:id
 */
router.get("/users/:id", isAdmin, async (req, res) => {
  console.log("Inside get user by id");
  try {
    const [user] = await User.getUserById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in getting user by id", error });
  }
});

/**
 * @route POST /admin/users/:id
 * @desc Update user role by id
 * @body { role: "admin" }
 */
router.post("/users/:id", isAdmin, async (req, res) => {
    const id = req.params.id;
    const role = req.body.role;

    // check if role is valid
    if (!["admin", "user" , "writer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }


  try {
    const user = await User.updateUserPrivileges(id, role);
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in updating user role", error });
  }
});

exports = module.exports = router;
