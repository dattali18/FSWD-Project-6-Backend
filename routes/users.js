const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/adminMiddleware');
const userModel = require('../models/User');

/**
 * @desc Delete a user by id
 * @route DELETE /users/:id
 * @access Private
 */
router.delete('/:id', isAdmin,  async (req, res) => {
    const id = req.params.id;

    try {
        const [user] = await userModel.getUserById(id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // delete the user
        const result = await userModel.deleteUser(id);

        if (result.affectedRows === 1) {
            return res.status(200).send('User deleted successfully');
        }

        return res.status(500).send('Internal Server Error');
    } catch (error) {
        console.error('Error in deleting user', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;