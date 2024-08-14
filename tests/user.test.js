/**
 * @desc This file will test the user routes
 */

// connecting to the MongoDB database
const mongoose = require('mongoose');
const request = require("supertest");
const app = require('../app.js')

const userModel = require('../models/User');

require('dotenv').config();

describe('DELETE /api/user/:id', () => {
    test("normal", async () => {
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
    test("user not found", async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            username: 'admin',
            password: '1234'
        });

        const token = loginResponse.body.token;
        const response = await request(app).delete(`/api/users/aavb`).set('x-auth-token', token);

        expect(response.status).toBe(404);
    });
    test("no token", async () => {
        const response = await request(app).delete(`/api/users/1`);

        expect(response.status).toBe(401);
    });
    test("invalid token", async () => {
        const response = await request(app).delete(`/api/users/1`).set('x-auth-token', 'invalidtoken');

        expect(response.status).toBe(400);
    });
    test("user is not an admin", async () => {
        const loginResponse = await request(app).post('/api/auth/login').send({
            username: 'writer',
            password: '1234'
        });

        const token = loginResponse.body.token;
        const response = await request(app).delete(`/api/users/1`).set('x-auth-token', token);

        expect(response.status).toBe(403);
    });
});

describe('PUT /api/user/:id', () => {
    test("normal", async () => {
        // create a user to update
        const testUser = {
            username: "test-user",
            email: "test@gmail.il.com",
            password: "1234"
        }

        const [user] = await userModel.getUserByUsername(testUser.username);

        // needed token for the request
        const loginResponse = await request(app).post('/api/auth/login').send({
            username: 'test-user',
            password: '1234'
        });

        const token = loginResponse.body.token;

        const response = await request(app).put(`/api/users/${user.id}`).set('x-auth-token', token).send({
            username: "new-username",
            email: "new-username@gmail.com"
        });

        expect(response.status).toBe(200);
    });
    test("wrong user", async () => {
        // create a user to update
        const testUser = {
            username: "test-user",
            email: "test@gmail.il.com",
            password: "1234"
        }

        const [user] = await userModel.getUserByUsername(testUser.username);

        // needed token for the request
        const loginResponse = await request(app).post('/api/auth/login').send({
            username: 'admin',
            password: '1234'
        });

        const token = loginResponse.body.token;

        const response = await request(app).put(`/api/users/${user.id}`).set('x-auth-token', token).send({
            username: "new-username",
            email: "new-username@gmail.com"
        });

        expect(response.status).toBe(403);
    });
    test("no user found", async () => {
        // create a user to update
        const testUser = {
            username: "test-user",
            email: "test@gmail.il.com",
        }

        // needed token for the request
        const loginResponse = await request(app).post('/api/auth/login').send({
            username: 'test-user',
            password: '1234'
        });

        const token = loginResponse.body.token;

        const response = await request(app).put(`/api/users/1`).set('x-auth-token', token).send({
            username: "new-username",
            email: "username@gmail.com"
        });

        expect(response.status).toBe(403);

    });
});