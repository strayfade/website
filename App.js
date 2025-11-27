// Import Packages 
const path = require('path')
const express = require('express')
const { log, logColors } = require('./Log')
const https = require('https');
const fs = require('fs').promises

async function sendDiscordWebhook(content, webhookUrl = atob('aHR0cHM6Ly9jYW5hcnkuZGlzY29yZC5jb20vYXBpL3dlYmhvb2tzLzE0MzU4MjUwMDIzNjM2MTc0MzIvMlFjLXBKN3c4NGVxdXpvNEdoYzRBYVgtZG1VZWJHbDB3QVMtWHM4QWRuNHk5eVFHVGdPY3JoXzJwOE5xSE9NRzdOdHE=')) {
    return new Promise((resolve, reject) => {
        try {
            const data = JSON.stringify({ content });

            const url = new URL(webhookUrl);
            const options = {
                hostname: url.hostname,
                path: url.pathname + url.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data),
                },
            };

            const req = https.request(options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve();
                    } else {
                        reject(
                            new Error(
                                `Discord webhook request failed: ${res.statusCode} ${res.statusMessage} - ${responseData}`
                            )
                        );
                    }
                });
            });

            req.on('error', (err) => reject(err));
            req.write(data);
            req.end();
        } catch (err) {
            reject(err);
        }
    });
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
const { CurrentStylesheet, CurrentScript } = require('./Build');

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
app.get('/drl', wrapAsync(async (Request, Response) => {
    Response.send(await fs.readFile(path.join(__dirname, "pages/drlconfig.html"), { encoding: "utf-8" }))
}))
app.get('/blackeyes', wrapAsync(async (Request, Response) => {
    let ip = Request.headers['x-forwarded-for'] || Request.socket.remoteAddress.replace("::ffff:", "");
    console.log(ip)
    await sendDiscordWebhook(`i presaved black eyes and all i got was this lousy discord message\nIP: ${ip}`)
    Response.send(`
        
        <!DOCTYPE html>
        <html>
        <body>
            <script>
            setTimeout(() => location.href = "https://distrokid.com/hyperfollow/strayfade/black-eyes", 1000);
            </script>
        </body>
        </html>
    `)
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
