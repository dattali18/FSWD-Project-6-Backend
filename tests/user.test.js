/**
 * @desc This file will test the user routes
 */

// connecting to the MongoDB database
const mongoose = require('mongoose');
const request = require("supertest");
const app = require('../app.js')

const userModel = require('../models/User');

require('dotenv').config();

describe('Test the users routes', () => {
    test("DELETE /users/:id", async () => {
        // create a user to delete
        const testUser = {
            username: "test",
            email: "test@gmail.com",
            password: "1234"
        }
        const [user] = await userModel.createUser(testUser);
        // needed token for the request
        const loginResponse = await request(app).post('/api/auth/login').send({
            username: 'admin',
            password: '1234'
        });

        const token = loginResponse.body.token;
        const response = await request(app).delete(`/api/users/${user.id}`).set('x-auth-token', token);

        expect(response.status).toBe(200);
    });
    test("DELETE /users/:id - user not found", async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            username: 'admin',
            password: '1234'
        });

        const token = loginResponse.body.token;
        const response = await request(app).delete(`/api/users/aavb`).set('x-auth-token', token);

        expect(response.status).toBe(404);
    });
    test("DELETE /users/:id - no token", async () => {
        const response = await request(app).delete(`/api/users/1`);

        expect(response.status).toBe(401);
    });
    test("DELETE /users/:id - invalid token", async () => {
        const response = await request(app).delete(`/api/users/1`).set('x-auth-token', 'invalidtoken');

        expect(response.status).toBe(400);
    });
    test("DELETE /users/:id - user is not an admin", async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            username: 'writer',
            password: '1234'
        });

        const token = loginResponse.body.token;
        const response = await request(app).delete(`/api/users/1`).set('x-auth-token', token);

        expect(response.status).toBe(403);
    });
});