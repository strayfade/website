// Import Packages
const fs = require('fs/promises')
const path = require('path')
const express = require('express')
const { Log } = require('./Log')

// Create App
const App = express()

const WrapAsync = (Function) => {
    return (Request, Response, Next) => {
        const FunctionOut = Function(Request, Response, Next)
        return Promise.resolve(FunctionOut).catch(Next)
    }
}

// Basic Security
require('./security/Security').Setup(App)
const RequestBlocking = require('./RequestBlocking')
App.use(RequestBlocking.Middleware)

// Use cookie-parser
const cookieParser = require('cookie-parser');
App.use(cookieParser());

// Static Directories
App.use('/assets', express.static('assets'))
App.use('/', express.static('build'))

// Sources
App.get(
    '/favicon.ico',
    WrapAsync(async (Request, Response) => {
        Response.sendFile(path.resolve(__dirname, 'assets/Icon.ico'))
    })
)
App.get(
    '/robots.txt',
    WrapAsync(async (Request, Response) => {
        Response.sendFile(path.resolve(__dirname, 'assets/robots.txt'))
    })
)

// Routing
const Re = require('./pages/Re').Re
const Homepage = require('./pages/Homepage').Homepage
const Post = require('./pages/Post').Post
App.get(
    '/R',
    WrapAsync(async (Request, Response) => {
        Response.send(await Re(Request))
    })
)
App.get(
    '/',
    WrapAsync(async (Request, Response) => {
        Response.send(await Homepage(Request))
    })
)
App.get(
    '/:path',
    WrapAsync(async (Request, Response) => {
        const ValidPost = await Post(Request)
        if (!ValidPost) {
            Response.status(404).send(
                await Post({
                    path: '/404',
                    cookies: Request.cookies
                })
            )
        } else {
            Response.send(ValidPost)
        }
    })
)

// Error Handling
App.use((Error, Request, Response, Next) => {
    Log('Error: ')
    console.log(Error)
    Next(Error)
})
App.get(
    '*',
    WrapAsync(async (Request, Response) => {
        Response.send(
            await Post({
                path: '/404',
                cookies: Request.cookies
            })
        )
    })
)
App.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(404)
})

module.exports = { App }
