const express = require("express");
const router = express.Router();

const isAdmin = require("../middleware/adminMiddleware");
const auth = require("../middleware/authMiddleware");
const userModel = require("../models/User");

/**
 * @desc Delete a user by id
 * @route DELETE /users/:id
 * @access Private
 */
router.delete("/:id", isAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const [user] = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // delete the user
    const result = await userModel.deleteUser(id);

    if (result.affectedRows === 1) {
      return res.status(200).send("User deleted successfully");
    }

    return res.status(500).send("Internal Server Error");
  } catch (error) {
    console.error("Error in deleting user", error);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * @desc Update a user by id
 * @route PUT /users/:id
 * @access Private
 * @body {Object} user
 * @body {string} user.username
 * @body {string} user.email
 */
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  /**
   * @type {Object}
   * @property {string} username
   * @property {string} email
   */
  const userReq = req.body;

  // checking if the user that want to change is the same as the user that is logged in
  if (req.user.id !== id) {
    return res.status(403).send("Forbidden access");
  }

  try {
    const [existingUser] = await userModel.getUserById(id);

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const result = await userModel.updateUser(id, userReq);

    if (result.affectedRows === 1) {
      return res.status(200).send("User updated successfully");
    }

    return res.status(500).send("Internal Server Error");
  } catch (error) {
    console.error("Error in updating user", error);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * @desc Get a user by id
 * @route GET /users/:id
 * @access Private
 */
router.get("/:id", auth, async (req, res) => {
  let id = req.params.id;

  // checking if the user that want to change is the same as the user that is logged in
  if (String(req.user.id) !== id) {
    return res.status(403).send("Forbidden access");
  }

  try {
    // return the user without the password
    const user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    };
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error in getting user", error);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * @desc Get a user by username
 * @route GET /users/username/:username
 * @access Private
 */
router.get("/username/:username", auth, async (req, res) => {
  let username = req.params.username;

  // checking if the user that want to change is the same as the user that is logged in
  // if (req.user.username !== username) {
  //     return res.status(403).send('Forbidden access');
  // }

  try {
    let [user] = await userModel.getUserByUsername(username);
    // return the user without the password
    user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error in getting user", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
