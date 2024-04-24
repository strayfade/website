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

// Static Directories
App.use('/assets', express.static('assets'))
App.use('/build', express.static('build'))

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
const Homepage = require('./pages/Homepage').Homepage
const Post = require('./pages/Post').Post
const Re = require('./pages/Re').Re
App.get(
    '/',
    WrapAsync(async (Request, Response) => {
        Response.send(await Homepage(Request))
    })
)
App.get(
    '/:path',
    WrapAsync(async (Request, Response) => {
        const ValidPost = await Post(Request);
        if (!ValidPost) {
            Response.redirect("/404")
        }
        else {
            Response.send(ValidPost)
        }
    })
)
App.get(
    '/R',
    WrapAsync(async (Request, Response) => {
        Response.send(await Re(Request))
    })
)

// Error Handling
App.use((Error, Request, Response, Next) => {
    Log('Error: ')
    console.log(Error)
    Next(Error)
})
App.get('*', (Request, Response) => {
    Response.redirect("/404")
})
App.use((Error, Request, Response, Next) => {
    Response.redirect("/500")
})

module.exports = { App }
