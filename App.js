// Import Packages
const fs = require('fs/promises')
const fsdir = require('fs')
const path = require('path')
const express = require('express')

// Imported Functions
const { Log } = require('./Log')
const { SendError } = require('./Error')
const { GeneratePageCached } = require("./generators/Assemble")
const { CollectAnalytics, GetAnalyticsFromRequest } = require('./Database')
const { GetAvailableLanguages, GetLanguage, GetLanaguageShort, GetLanguagePath } = require('./Localization')

// Import Config
const Config = require("./Config")

// Create App
const App = express()

const Languages = GetAvailableLanguages()
const AvailablePages = {
    Home: Symbol("Home"),
    Dynamic: Symbol("Article"),
    R: Symbol("R"),
    NonstandardPages: ["R"]
}

const WrapAsync = (Function) => {
    return (req, res, next) => { const FunctionOut = Function(req, res, next); return Promise.resolve(FunctionOut).catch(next); }
};

// Basic Security
require('./security/Security').Setup(App)

// Static Directories
App.use('/cdn', express.static('cdn'))
App.use('/assets', express.static('assets'))
App.use('/fonts', express.static('fonts'))

// Middleware
const Analytics = require("./middleware/Analytics")
App.use(Analytics.Middleware)
const RequestBlocking = require("./middleware/RequestBlocking")
App.use(RequestBlocking.Middleware)

// Sources
App.get('/Production.css', WrapAsync(async function(req, res) {
    res.sendFile(__dirname + "/Production/Production.css")
}))
App.get('/Production.js', WrapAsync(async function(req, res) {
    res.sendFile(__dirname + "/Production/Production.js")
}))
App.get('/favicon.ico', WrapAsync(async function(req, res) {
    res.sendFile(path.resolve(__dirname, 'assets/Icon.ico'))
}))
App.get('/robots.txt', WrapAsync(async function(req, res) {
    res.sendFile(path.resolve(__dirname, 'assets/robots.txt'))
}))

// Default Routing
App.get('/', WrapAsync(async function (req, res) {
    const Article = await fs.readFile('./posts/_None.md', {encoding: "utf-8"})
    let Lang = require(GetLanguagePath(req))
    let Page = await GeneratePageCached(req, Article, Lang, AvailablePages, AvailablePages.Home, "")
    res.send(Page)
}))
App.get('/:path', WrapAsync(async function (req, res) {
    res.redirect("/" + GetLanaguageShort(req) + "/" + req.params.path)
}))
App.get('/:localization/:path', WrapAsync(async function (req, res) {

    var Lang = {}
    if (Languages.includes(req.params.localization))
        Lang = require('./localization/' + req.params.localization + '.json')
    else 
        Lang = require(GetLanguagePath(req))

    let IsNotArticle = AvailablePages.NonstandardPages.includes(req.params.path);
    if (IsNotArticle) {
        switch (req.params.path) {
            case "R":
                let Article = await fs.readFile('./posts/_None.md', {encoding: "utf-8"})
                let Page = await GeneratePageCached(req, Article, Lang, AvailablePages, AvailablePages.R, "");
                res.send(Page)
                break;
        }
    } else {
        let ArticlePath = './posts/' + req.params.path + '.md'
        if (fsdir.existsSync(ArticlePath) && req.params.path != "_None") {
            let Article = await fs.readFile('./posts/' + req.params.path + '.md', {encoding: "utf-8"})
            let Page = await GeneratePageCached(req, Article, Lang, AvailablePages, AvailablePages.Dynamic, "", req.params.path + '.md')
            res.send(Page)
        } else {
            Log("Requested page not found (404): " + req.path)
            await SendError(404, req, res, AvailablePages, AvailablePages.Dynamic, "", Languages);
        }
    }
}))

// Error Handling Middleware
const { ErrorLogger, ErrorHandler } = require('./middleware/ErrorHandling')
App.use(ErrorLogger)
App.use(ErrorHandler)

// Start Server
var Port = process.env.PORT || Config.App.Port;
App.listen(Port, () => {
    Log('Listening on port ' + Port)
    Log('Link: http://localhost:' + Port)
})