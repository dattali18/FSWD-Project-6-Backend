const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');

require('dotenv').config();

/**
 * @path POST /auth/login
 */
router.post('/login', (req, res) => {
    // get the user from the userModel and check the user and password
    const username = req.body.username;
    const password = req.body.password;

    // if the username is null or password in null
    if (!username || !password) {
        return res.status(400).json({message: 'Both username and password are required'});
    }

    // find the user from the userModel
    const user = userModel.getUserByUsername(username);
    // if the user is not found
    if (!user) {
        return res.status(404).json({message: 'Invalid username or password'});
    }
    // check the password with bycrypt
    if (!bycrypt.compare(password, user.password)) {
        return res.status(401).json({message: 'Invalid username or password'});
    }

    // generate a token
    const token = jwt.sign({username: user.username, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '1d'});

    // send the token to the user
    res.status(200).json({token: token, message: "Login successful"});
});

module.exports = router;
