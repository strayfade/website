const request = require('supertest')

const fs = require('fs')
const path = require('path')

const { Server } = require('../Server')

describe('Server', () => {
    // Production javascript/css
    it('serves resources from the static directory', async () => {
        await request(Server)
            .get('/build/production.js')
            .expect('Content-Type', /^application\/javascript/)
            .expect(200)
        await request(Server)
            .get('/build/production.css')
            .expect('Content-Type', /^text\/css/)
            .expect(200)
    });
    // Check homepage (/)
    it('serves the homepage properly', async () => {
        await request(Server)
            .get('/')
            .expect('Content-Type', /^text\/html/)
            .expect(200)
    });
    // Check hidden pages
    it('serves secrets properly', async () => {
        await request(Server)
            .get('/R')
            .expect('Content-Type', /^text\/html/)
            .expect(200)
    });
    // Check posts
    it(`serves the post "500" properly`, async () => {
        await request(Server)
            .get(`/500`)
            .expect('Content-Type', /^text\/html/)
            .expect(200)
    });
    it('serves 404 page when route does not exist', async () => {
        await request(Server)
            .get('/nonExistentRoute')
            .expect('Content-Type', /^text\/html/)
            .expect(404);
    });
})

Server.close()
