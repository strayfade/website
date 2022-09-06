const fs = require('fs')
const env = require('dotenv');
const geoip = require('geoip-lite');

const config = require("./config/config.json");

// Dynamic Page Creation
const pageHead = require('./generators/Head')
const pageHeader = require('./generators/Header')
const pageBody = require('./generators/Body')
const pageFooter = require('./generators/Footer')
const pageAssemble = require('./generators/Assemble')
let Generators = {
    Head: pageHead,
    Header: pageHeader,
    Body: pageBody,
    Footer: pageFooter,
    Assembler: pageAssemble
}

// Load list of all languages for checking if a locale exists
const availableLanguages = require('./localization.json')

const express = require('express')
const app = express()

// Cross-Origin Resource Sharing
const cors = require('cors');
app.use(cors());

// Static Directories
app.use('/assets', express.static('assets'))
app.use('/scripts', express.static('scripts'))
app.use('/fonts', express.static('fonts'))
app.use('/posts', express.static('posts'))
app.use('/css', express.static('css'))

function SendError(errNum, req, res) {
    const Article = require('./posts/' + errNum + '.json')
    if (availableLanguages.includes(req.params.localization)) { // Check if localization param is present
        let Lang = require('./localization/' + req.params.localization + '.json')
        res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
    }
    else { // No localization param, default to en-us
        let Lang = require('./localization/en-us.json')
        res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
    }
}

// Event Tracking
app.use(express.json())
app.post('/api/production', (req, res) => {
    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    req.body.location = geoip.lookup(req.body.ip)
    if (!fs.existsSync(config.analytics)) {
        fs.writeFileSync(config.analytics, "[]")
    }
    fs.readFile(config.analytics, 'utf-8', function (err, data) {
        if (err) {
            res.sendStatus(503)
        }
        let Data = JSON.parse(data)
        Data.push(req.body)
        fs.writeFile(config.analytics, JSON.stringify(Data), function (err) {})
    })
    res.sendStatus(200);
})
app.get('/api/analytics', (req, res) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.setHeader("www-authenticate", "Basic");
        res.sendStatus(401)
        return;
    }
    else {
        // Credit https://benborgers.com/posts/express-password-protect
        const [username, password] = Buffer.from(authorization.replace("Basic ", ""), "base64").toString().split(":");
        if (!(username == env.config().parsed.USER && password == env.config().parsed.PASS)) {
            res.setHeader("www-authenticate", "Basic");
            SendError(403, req, res);
            return;
        }
        else {
            if (!fs.existsSync(config.analytics)) {
                fs.writeFileSync(config.analytics, "[]")
            }
            fs.readFile(config.analytics, 'utf-8', function (err, data) {
                if (err) {
                    SendError(503, req, res);
                    return;
                }
                res.send(JSON.parse(data))
            })
        }
    }
})

app.get('/', (req, res) => {
    const Article = require('./posts/P0.json')
    let Lang = require('./localization/en-us.json')
    res.send(pageAssemble.GeneratePage(Article, Lang, Generators, true))
})
app.get('/:path', (req, res) => {
    res.redirect("/en-us/" + req.params.path)
})
app.get('/:localization/:path', (req, res) => {
    let ArticlePath = './posts/' + req.params.path + '.json'
    if (fs.existsSync(ArticlePath)) { // Page exists, load into Article
        const Article = require('./posts/' + req.params.path + '.json')
        if (availableLanguages.includes(req.params.localization)) { // Check if localization param is present
            let Lang = require('./localization/' + req.params.localization + '.json')
            res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
        }
        else { // No localization param, default to en-us
            let Lang = require('./localization/en-us.json')
            res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
        }
    }
    else { // Page doesn't exist, send 404
        SendError(404, req, res);
    }
})

// Handle Server Errors
app.use(function (error, req, res, next) {
    console.log(error)
    SendError(500, req, res);
});

var Port = process.env.PORT || config.port;
app.listen(Port, () => {
    console.log('Listening on port ' + Port)
    console.log('Link: http://localhost:' + Port)
})
