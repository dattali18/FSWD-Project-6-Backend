/**
 * @desc This file will test the authentication routes
 */

// connecting to the MongoDB database
const mongoose = require('mongoose');
const request = require("supertest");
const app = require('../app.js')

require('dotenv').config();

const userModel = require('../models/User');

/* Connecting to the database before each test. */
beforeEach(async () => {
    // await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    // await mongoose.connection.close();
});

const axios = require('axios');

describe('Testing the authentication routes', () => {
    test('POST /api/auth/login', async  () => {
        const testUser = {
            username: 'admin',
            password: '1234'
        };

        const response = await request(app).post('/api/auth/login').send(testUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
    test('POST /api/auth/register', async () => {
        const testUser = {
            username: 'test1',
            email: 'test1@email.com',
            password: '1234'
        };

        const response = await request(app).post('/api/auth/register').send(testUser);

        expect(response.status).toBe(201);

        // check if the user is created
        const user = await userModel.getUserByUsername(testUser.username);
        expect(user).not.toBeNull();
    });
});