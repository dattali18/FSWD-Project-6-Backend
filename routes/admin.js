/**
 * @desc Admin routes
 */

const isAdmin = require('../middleware/adminMiddleware');

const express = require('express');
const router = express.Router();

router.get('/is-admin', isAdmin, (req, res) => {
    return res.status(200).json({ message: 'You are an admin', isAdmin: true });
});


exports = module.exports = router;