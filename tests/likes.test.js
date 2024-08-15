/**
 * @desc This file is used to test the likes routes
 */

const request = require("supertest");
const app = require('../app.js')

describe('POST /api/likes', () => {
    test("normal", async () => {
        const user = {
            username: "test",
            password: "1234"
        }

        const login = await request(app).post('/api/auth/login').send(user);
        const token = login.body.token;

        const response = await request(app).post('/api/likes').set('x-auth-token', token).send({article_id: 2});

        expect(response.status).toBe(201);
    });
});