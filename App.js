// Import Packages
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

// Run build
const { CurrentStylesheet, CurrentScript } = require('./Build')

// Basic Security
require('./security/Security').Setup(App)
const RequestBlocking = require('./RequestBlocking')
App.use(RequestBlocking.Middleware)

// Static Directories
App.use('/assets', express.static('assets'))
App.use('/', express.static('build'))

// Sources
App.get('/favicon.ico', WrapAsync(async (Request, Response) => {
    Response.sendFile(path.resolve(__dirname, 'assets/Icon.ico'))
}))
App.get('/robots.txt', WrapAsync(async (Request, Response) => {
    Response.sendFile(path.resolve(__dirname, 'assets/robots.txt'))
}))

// Routing
const Re = require('./pages/Re').Re
const Homepage = require('./pages/Homepage').Homepage
const Post = require('./pages/Post').Post
App.get('/R', WrapAsync(async (Request, Response) => {
    Response.send(await Re(Request, {
        stylesheet: CurrentStylesheet,
        script: CurrentScript
    }))
}))

let Port = 3000;
if (process.argv[2])
    Port = process.argv[2]
else if (process.env.PORT)
    Port = process.env.PORT
else 
    Port = 3000
App.get('/', WrapAsync(async (Request, Response) => {
    Response.send(await Homepage(Request, {
        stylesheet: CurrentStylesheet,
        script: CurrentScript
    }, Port))
}))
App.get('/:path', WrapAsync(async (Request, Response, Next) => {
    const ValidPost = await Post(Request, {
        stylesheet: CurrentStylesheet,
        script: CurrentScript
    })
    if (!ValidPost) {
        Next();
    } else {
        Response.send(ValidPost)
    }
}))

// Error Handling
App.use((Error, Request, Response, Next) => {
    Log('Error: ')
    console.log(Error)
    Next(Error)
})
App.get('*', WrapAsync(async (Request, Response) => {
    Response.sendStatus(404);
}))
App.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(404)
})

module.exports = { App }
