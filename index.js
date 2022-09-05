const fs = require('fs') // For checking if pages exist on the server
const config = require("./config/config.json");
const geoip = require('geoip-lite'); // Geolocation analytics

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

// Event Tracking
app.use(express.json())
app.post('/api/analytics', (req, res) => {
    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (!fs.existsSync(config.analytics)) {
        fs.writeFileSync(config.analytics, "[]")
    }
    fs.readFile(config.analytics, 'utf-8', function(err, data) {
        if (err) {
            res.sendStatus(503)
        }
        let Data = JSON.parse(data)
        Data.push(req.body)
        fs.writeFile(config.analytics, JSON.stringify(Data), function(err) {
            console.log(err)
        })
    })
    res.sendStatus(200);
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
        const Article = require('./posts/404.json')
        if (availableLanguages.includes(req.params.localization)) { // Check if localization param is present
            let Lang = require('./localization/' + req.params.localization + '.json')
            res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
        }
        else { // No localization param, default to en-us
            let Lang = require('./localization/en-us.json')
            res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
        }
    }
})

// Handle Server Errors
app.use(function (error, req, res, next) {
    console.log(error)
    const Article = require('./posts/500.json')
    if (req.params.localization) {
        if (availableLanguages.includes(req.params.localization)) {
            let Lang = require('./localization/' + req.params.localization + '.json')
            res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
            return;
        }
    }
    let Lang = require('./localization/en-us.json')
    res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
});

var Port = process.env.PORT || config.port;
app.listen(Port, () => {
    console.log('Listening on port ' + Port)
    console.log('Link: http://localhost:' + Port)
})
