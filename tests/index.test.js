const request = require('supertest')

const { Server } = require('../Server')

describe('Server', () => {
    it('serves resources from the static directory', async () => {
        await request(Server).get('/production.js').expect(302)
        await request(Server).get('/production.css').expect(302)
    })
    it('serves the homepage properly', async () => {
        await request(Server)
            .get('/')
            .expect('Content-Type', /^text\/html/)
            .expect(200)
    })
    it('serves other pages properly', async () => {
        await request(Server)
            .get('/R')
            .expect('Content-Type', /^text\/plain/)
            .expect(302)
    })
    it('serves manifest, favicons, etc.', async () => {
        await request(Server)
            .get('/manifest.json')
            .expect('Content-Type', /^text\/plain/)
            .expect(302)
        await request(Server)
            .get('/favicon.ico')
            .expect('Content-Type', /^image\/x-icon/)
            .expect(200)
    })
})

Server.close()
