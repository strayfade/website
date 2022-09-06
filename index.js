const fs = require('fs')

const config = require("./config/config.json");

// Imported Functions
const { SendError } = require('./Error')
const { Generators } = require('./Generators')
const { CollectAnalytics } = require('./Analytics')
const languages = require('./Localization').GetAvailableLanguages(config)

const express = require('express')
const app = express()

// Static Directories
app.use('/assets', express.static('assets'))
app.use('/scripts', express.static('scripts'))
app.use('/fonts', express.static('fonts'))
app.use('/posts', express.static('posts'))
app.use('/css', express.static('css'))
app.use('/icons', express.static('icons'))

app.get('/api/Analytics', (req, res) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.setHeader("www-authenticate", "Basic");
        res.sendStatus(401)
        return;
    }
    else {
        // Credit https://benborgers.com/posts/express-password-protect
        const [username, password] = Buffer.from(authorization.replace("Basic ", ""), "base64").toString().split(":");
        if (!(username == process.env.USER && password == process.env.PASS)) {
            res.setHeader("www-authenticate", "Basic");
            SendError(403, req, res, "", languages);
            return;
        }
        else {
            if (!fs.existsSync(config.analytics)) {
                fs.writeFileSync(config.analytics, "[]")
            }
            fs.readFile(config.analytics, 'utf-8', function (err, data) {
                if (err) {
                    SendError(503, req, res, "", languages);
                    return;
                }
                res.send(JSON.parse(data))
            })
        }
    }
})

app.get('/', (req, res) => {
    CollectAnalytics(req, res, config)
    const Article = require('./posts/P0.json')
    let Lang = require('./localization/en-us.json')
    res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, true))
})
app.get('/:path', (req, res) => {
    res.redirect("/en-us/" + req.params.path)
})
app.get('/:localization/:path', (req, res) => {
    CollectAnalytics(req, res, config)
    let ArticlePath = './posts/' + req.params.path + '.json'
    if (fs.existsSync(ArticlePath)) { // Page exists, load into Article
        const Article = require('./posts/' + req.params.path + '.json')
        if (languages.includes(req.params.localization)) { // Check if localization param is present
            let Lang = require('./localization/' + req.params.localization + '.json')
            res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators))
        }
        else { // No localization param, default to en-us
            let Lang = require('./localization/en-us.json')
            res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators))
        }
    }
    else { // Page doesn't exist, send 404
        SendError(404, req, res, "", languages);
    }
})

// Handle Server Errors
app.use(function (error, req, res, next) {
    console.log(error)
    SendError(500, req, res, error.toString(), languages);
});

var Port = process.env.PORT || config.port;
app.listen(Port, () => {
    console.log('Listening on port ' + Port)
    console.log('Link: http://localhost:' + Port)
})
