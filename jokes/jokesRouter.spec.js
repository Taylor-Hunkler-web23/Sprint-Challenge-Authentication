const request = require('supertest'); //bring in supertest

const server = require('../api/server.js')

describe('server', function () {
    describe('/api/jokes', function () {
        it('should return message of no credential provided', function () {

            return request(server)
                .get('/api/jokes')
                .then(res => {

                    expect(res.body).toEqual({ "message": "No credentials provided" });
                })
        })
    })
})

it('should return JSON body type', async () => {

    const res = await request(server).get('/api/jokes')


    expect(res.type).toMatch(/json/i);


})

