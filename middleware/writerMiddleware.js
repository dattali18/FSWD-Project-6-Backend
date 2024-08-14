/**
 * @desc This file contains the middleware for writer routes
 */

const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const writerModel = require('../models/Writers');

require('dotenv').config();


/**
 * @desc This middleware checks if the user is an admin
 */
const isWriter = (req, res, next) => {
    // get the token from the header
    const token = req.header('x-auth-token');
    // if the token is null
    if (!token) {
        return res.status(401).json({message: 'Access denied'});
    }

    // verify the token
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // get the user with username from the db
        const user = userModel.getUserByUsername(verified.username);
        const isWriter = writerModel.isUserWriter(user.id);
        if (user.role !== 'writer' || !isWriter) {
            return res.status(403).json({message: 'Access denied'});
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({message: 'Invalid token'});
    }
};

module.exports = isWriter;