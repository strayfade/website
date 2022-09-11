const fs = require('fs')

const config = require("./config/config.json");

// Imported Functions
const { SendError } = require('./Error')
const { Generators } = require('./Generators')
const { CollectAnalytics, GetLanguagePath } = require('./Analytics')
const Languages = require('./Localization').GetAvailableLanguages(config)

const express = require('express')
const app = express()

require('./security/Security').Setup(app)

app.disable('x-powered-by')

// Static Directories
app.use('/assets', express.static('assets'))
app.use('/scripts', express.static('scripts'))
app.use('/fonts', express.static('fonts'))
app.use('/posts', express.static('posts'))
app.use('/css', express.static('css'))
app.use('/icons', express.static('icons'))

// Analytics Middleware
app.use((req, res, next) => {
    try {
        CollectAnalytics(req, res, config);
    }
    catch(error) {
        console.error(error)
        SendError(500, req, res, error, Languages);
    }
    next();
})

app.get('/', (req, res) => {
    const Article = require('./posts/_None.json')
    let Lang = require(GetLanguagePath(req))
    res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, true))
})
app.get('/:path', (req, res) => {
    res.redirect("/en-us/" + req.params.path)
})
app.get('/:localization/:path', (req, res) => {
    let ArticlePath = './posts/' + req.params.path + '.json'
    if (fs.existsSync(ArticlePath)) { // Page exists, load into Article
        const Article = require('./posts/' + req.params.path + '.json')
        if (Languages.includes(req.params.localization)) { // Check if localization param is present
            let Lang = require('./localization/' + req.params.localization + '.json')
            res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators))
        }
        else { // No localization param, default to header-specified language
            let Lang = require(GetLanguagePath(req))
            res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators))
        }
    }
    else {
        SendError(404, req, res, "", Languages);
    }
})

// Error Handling Middleware
function ErrorLogger(error, req, res, next) {
    console.error(error)
    next(error)
}
function ErrorHandler(error, req, res, next) {
    if (error.type == 'redirect')
        SendError(404, req, res, error.toString(), Languages);
    else if (error.type == 'time-out')
        SendError(408, req, res, error.toString(), Languages);
    else
        next(error)
}
function ErrorHandlerGeneric(error, req, res, next) {
    SendError(500, req, res, error, Languages);
}
app.use(ErrorLogger)
app.use(ErrorHandler)
app.use(ErrorHandlerGeneric)

// Start Server
var Port = process.env.PORT || config.port;
app.listen(Port, () => {
    console.log('Listening on port ' + Port)
    console.log('Link: http://localhost:' + Port)
})
