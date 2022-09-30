const fs = require('fs')
const { getEmoji } = require('language-flag-colors')

const config = require("./config/config.json");

// Imported Functions
const { SendError } = require('./Error')
const { Generators } = require('./Generators')
const { CollectAnalytics } = require('./Database')
const { GetAvailableLanguages, GetLanguage, GetLanaguageShort, GetLanguagePath } = require('./Localization')

// Create App
const express = require('express')
const app = express()

const Languages = GetAvailableLanguages(config)
const AvailablePages = {
    Home: "/",
    Dynamic: "..."
}

require('./security/Security').Setup(app)

app.disable('x-powered-by')

// Static Directories
app.use('/manifest', express.static('manifest'))
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
    res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.Home, "", getEmoji(GetLanguage(req))))
})
app.get('/:path', (req, res) => {
    res.redirect("/" + GetLanaguageShort(req) + "/" + req.params.path)
})
app.get('/:localization/:path', (req, res) => {
    let ArticlePath = './posts/' + req.params.path + '.json'
    if (fs.existsSync(ArticlePath)) { // Page exists, load into Article
        const Article = require('./posts/' + req.params.path + '.json')
        var Lang = require(GetLanguagePath(req))
        if (Languages.includes(req.params.localization)) { // Check if localization param is present
            Lang = require('./localization/' + req.params.localization + '.json')
        }
        res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.Dynamic, "", getEmoji(GetLanguage(req))))
    }
    else {
        SendError(404, req, res, AvailablePages, AvailablePages.Dynamic, "", Languages);
    }
})

// Error Handling Middleware
function ErrorLogger(error, req, res, next) {
    console.error(error)
    next(error)
}
function ErrorHandler(error, req, res, next) {
    if (error.type == 'redirect')
        SendError(404, req, res, AvailablePages, AvailablePages.Dynamic, error.toString(), Languages);
    else if (error.type == 'time-out')
        SendError(408, req, res, AvailablePages, AvailablePages.Dynamic, error.toString(), Languages);
    else
        next(error)
}
function ErrorHandlerGeneric(error, req, res, next) {
    SendError(500, req, res, AvailablePages, AvailablePages.Dynamic, error, Languages);
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
