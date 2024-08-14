/**
 * @desc This file will test the user routes
 */

// connecting to the MongoDB database
const mongoose = require('mongoose');
const request = require("supertest");
const app = require('../app.js')

require('dotenv').config();

describe('Test the users routes', () => {
    test("DELETE /users/:id", async () => {
        // needed token for the request
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjM2MzcwNDQsImV4cCI6MTcyMzcyMzQ0NH0.iYurrpGqRoiH4EhZAta2dBZZQRbqit8o9n1ODW0WAnM";
        const response = await request(app).delete('/api/users/4')
            .set('x-auth-token', token);

        expect(response.status).toBe(200);
    });
});