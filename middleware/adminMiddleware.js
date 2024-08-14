/**
 * @desc This file contains the middleware for admin routes
 */

const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const adminModel = require('../models/Admins');

require('dotenv').config();

/**
 * @desc This middleware checks if the user is an admin
 */
const isAdmin = async (req, res, next) => {
    // get the token from the header
    const token = req.header('x-auth-token');
    // if the token is null
    if (!token) {
        return res.status(401).json({message: 'Access denied'});
    }

    // verify the token
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log('verified:', verified);
        // get the user with username from the db
        const [user] = await userModel.getUserByUsername(verified.username);
        // console.log('user:', user);
        const isAdmin = await adminModel.isUserAdmin(user.id);
        if (user.role !== 'admin' || !isAdmin) {
            return res.status(403).json({message: 'Access denied'});
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({message: 'Invalid token'});
    }
};

module.exports = isAdmin;