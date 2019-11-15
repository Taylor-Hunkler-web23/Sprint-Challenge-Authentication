const request = require('supertest'); //bring in supertest

const server = require('../api/server.js') //bring in server

const db = require ("../database/dbConfig.js")

describe('register()', function () {

    
    beforeEach(async () => {
        await db('users').truncate();

    })



    it('should respond with status 200', async function () {

   

        await request(server)
            .post("/api/auth/register")
            .send({ username: "Jeep", password: "wrangler"})
            .then(res => {
                expect(res.status).toBe(201)
            })




    });



})

describe('get', function () {
    describe('post /', function () {
        it('should return json formated response', function () {

            return request(server)  
                .post('/api/auth/register')  
                .send({ username: "Jeep", password: "wrangler"})  
                .then(res => {

                    expect(res.type).toMatch(/json/i); 
                })
        })
    })
})


