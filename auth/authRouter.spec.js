const request = require('supertest'); //bring in supertest

const server = require('../api/server.js') //bring in server

const db = require("../database/dbConfig.js")

describe('POST register()', function () {

    beforeEach(async () => {
        await db('users').truncate();
    })

    it('should respond with status 200', async function () {
        await request(server)
            .post("/api/auth/register")
            .send({ username: "Jeep", password: "wrangler" })
            .then(res => {
                expect(res.status).toBe(201)
            })
    });
})

describe('POST register', function () {
    describe('post /', function () {
        it('should return json formated response', function () {

            return request(server)
                .post('/api/auth/register')
                .send({ username: "Jeep", password: "wrangler" })
                .then(res => {

                    expect(res.type).toMatch(/json/i);
                })
        })
    })
})


describe('POST login', function () {
    describe('post /', function () {
        it('should return json formated response', function () {

            return request(server)
                .post('/api/auth/login')
                .send({ username: "Jeep", password: "wrangler" })
                .then(res => {

                    expect(res.type).toMatch(/json/i);
                })
        })
    })
})



describe('POST login', function () {
    describe('post /', function () {
        it('should return message of Invalid credentials', function () {

            return request(server)
                .post('/api/auth/login')
                .send({ username: "Jeep", password: "wragler" })
                .then(res => {

                    expect(res.body).toEqual({ message: 'Invalid Credentials' });
                })
        })
    })
})
