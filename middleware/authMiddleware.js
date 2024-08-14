/**
 * @desc This file contains the middleware for authentication
 */

const jwt = require('jsonwebtoken');
const userModel = require("../models/User");

require('dotenv').config();

/**
 * @desc This function is a middleware to check if the user is authenticated
 */
const authMiddleware = (req, res, next) => {
    // get the token from the header
    const token = req.header('x-auth-token');

    console.log('token:', token);
    if (!token) {
        return res.status(401).json({message: 'Access Denied'});
    }

    // verify the token
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // verified is the payload of the token and is an object containing the username and email
        req.user = userModel.getUserByUsername(verified.username);
        next();
    } catch (err) {
        res.status(400).json({message: 'Invalid token'});
    }
}

module.exports = authMiddleware;