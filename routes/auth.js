const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');

require('dotenv').config();

/**
 * @path POST /auth/login
 * @body {string} username
 * @body {string} password
 */
router.post('/login', async (req, res) => {
    // get the user from the userModel and check the user and password
    const username = req.body.username;
    const password = req.body.password;

    // if the username is null or password in null
    if (!username || !password) {
        return res.status(400).json({message: 'Both username and password are required'});
    }

    // find the user from the userModel
    const [user] = await userModel.getUserByUsername(username);
    // if the user is not found
    if (!user) {
        return res.status(404).json({message: 'Invalid username or password'});
    }
    // check the password with bycrypt
    const result = bycrypt.compareSync(password, user.password);

    if (!result) {
        return res.status(401).json({message: 'Invalid username or password'});
    }

    // generate a token
    const token = jwt.sign({username: user.username, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '1d'});

    // send the token to the user
    return res.status(200).json({ token: token, message: "Login successful"});
});

/**
 * @path POST /auth/register
 * @body {string} username
 * @body {string} email
 * @body {string} password
 */
router.post('/register', async (req, res) => {
    // get the user from the userModel and check the user and password
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // if the username is null or password in null
    if (!username || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    // check if the user already exists
    const [user] = await userModel.getUserByUsername(username);
    if (user) {
        return res.status(409).json({message: 'User already exists'});
    }

    // create the user
    const newUser = new userModel.User(username, email, password);
    const response = await userModel.createUser(newUser);

    // send the response
    res.status(201).json({message: 'User created successfully', data: response});
});

module.exports = router;
