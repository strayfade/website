// Import Packages 
const path = require('path')
const express = require('express')
const { log, logColors } = require('./Log')
const https = require('https');

function send(message) {
    const data = JSON.stringify({ content: message });

    const url = new URL(atob('aHR0cHM6Ly9jYW5hcnkuZGlzY29yZC5jb20vYXBpL3dlYmhvb2tzLzE0MzU4MjI3NzEyNzkyMzMxNDcvU0ZhZm1sUTFxMEtRTEdONklqSnNjZWVDR0VOMjJrSzVEWEtVbG1HNlM5SjRiSGJCN205TFMyS084Y0pnWUJnWGlUM08=')); // Replace with your webhook URL
    const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };

    const req = https.request(options, (res) => {
        if (res.statusCode === 204) {

        } else {
            log(`Failed with status: ${res.statusCode}`, logColors.Error);
        }
    });

    req.on('error', (err) => {
        log(`Error sending message: ${err}`, logColors.Error);
    });

    req.write(data);
    req.end();
}

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
const Birthday = require('./pages/Birthday').Birthday
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

app.get('/gifts', wrapAsync(async (Request, Response) => {
    Response.send(await Birthday(Request, {
        stylesheet: CurrentStylesheet,
        script: CurrentScript
    }))
}))
app.get('/blackeyes', wrapAsync(async (Request, Response) => {
    let ip = Request.headers['x-forwarded-for'] || Request.socket.remoteAddress.replace("::ffff:", "");
    send(`i presaved black eyes and all i got was this lousy discord message\nIP: ${ip}`)
    Response.redirect(301, '')
}))
app.get('/:path', wrapAsync(async (Request, Response, Next) => {
    const ValidPost = await Post(Request, Request.params.path, {
        stylesheet: CurrentStylesheet,
        script: CurrentScript
    })
    if (ValidPost == 404) {
        Response.sendStatus(404);
    }
    else if (!ValidPost) {
        Next();
    } else {
        Response.send(ValidPost)
    }
}))

// Support for old links
app.get('/:lang/:path', wrapAsync(async (Request, Response, Next) => {
    const ValidPost = await Post(Request, Request.params.path, {
        stylesheet: CurrentStylesheet,
        script: CurrentScript
    })
    if (ValidPost == 404) {
        Response.sendStatus(404);
    }
    else if (!ValidPost) {
        Next();
    } else {
        Response.send(ValidPost)
    }
}))

// Error Handling
app.use((Error, Request, Response, Next) => {
    log('Error: ')
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
