const request = require('supertest')

const fs = require('fs')
const path = require('path')

const { Server } = require('../Server')

describe('Server', () => {
    it('serves resources from the static directory', async () => {
        await request(Server)
            .get('/build/production.js')
            .expect('Content-Type', /^application\/javascript/)
            .expect(200)
        await request(Server)
            .get('/build/production.css')
            .expect('Content-Type', /^text\/css/)
            .expect(200)
    })
    it('serves the homepage properly', async () => {
        await request(Server)
            .get('/')
            .expect('Content-Type', /^text\/html/)
            .expect(200)
    })
    it('serves secrets properly', async () => {
        await request(Server)
            .get('/R')
            .expect('Content-Type', /^text\/html/)
            .expect(200)
    })
    it(`serves all posts properly`, async () => {
        fs.readdir(path.join(__dirname, `../posts`), async (Error, Files) => {
            for (const File of Files) {
                await request(Server)
                    .get(`/${File.split('.')[0]}`)
                    .expect('Content-Type', /^text\/html/)
                    .expect(200)
            }
        })
    })
})

Server.close()
