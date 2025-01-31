// Import Packages 
const path = require('path')
const express = require('express')
const { Log } = require('./Log')

// Create app
const app = express()

const wrapAsync = (Function) => {
    return (Request, Response, Next) => {
        const FunctionOut = Function(Request, Response, Next)
        return Promise.resolve(FunctionOut).catch(Next)
    }
}

// Run build
const { CurrentStylesheet, CurrentScript } = require('./Build')

// Basic Security
require('./security/Security').Setup(app)

// Static Directories
app.use('/assets', express.static('assets'))
app.use('/', express.static('build'))

// Sources
app.get('/favicon.ico', wrapAsync(async (Request, Response) => {
    Response.sendFile(path.resolve(__dirname, 'assets/Icon.ico'))
}))
app.get('/robots.txt', wrapAsync(async (Request, Response) => {
    Response.sendFile(path.resolve(__dirname, 'assets/robots.txt'))
}))

// Routing
const Re = require('./pages/Re').Re
const Homepage = require('./pages/Homepage').Homepage
const Post = require('./pages/Post').Post
app.get('/R', wrapAsync(async (Request, Response) => {
    Response.send(await Re(Request, {
        stylesheet: CurrentStylesheet,
        script: CurrentScript
    }))
}))

app.get('/', wrapAsync(async (Request, Response) => {
    Response.send(await Homepage(Request, {
        stylesheet: CurrentStylesheet,
        script: CurrentScript
    }))
}))
app.get('/:path', wrapAsync(async (Request, Response, Next) => {
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
app.use((Error, Request, Response, Next) => {
    Log('Error: ')
    console.log(Error)
    Next(Error)
})
app.get('*', wrapAsync(async (Request, Response) => {
    console.log(Request.path)
    Response.sendStatus(404);
}))
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(404)
})

module.exports = { app }
