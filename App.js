// Import Packages
const fs = require('fs/promises')
const fsdir = require('fs')
const path = require('path')
const express = require('express')

// Imported Functions
const { Log } = require('./Log')
const { SendError } = require('./Error')
const PageBuilder = require("./generators/Assemble")
const { CollectAnalytics, GetAnalyticsFromRequest } = require('./Database')
const { GetAvailableLanguages, GetLanguage, GetLanaguageShort, GetLanguagePath } = require('./Localization')

// Import Webserver Config
const Config = require("./Config")

// Create App
const App = express()

const Languages = GetAvailableLanguages()
const AvailablePages = {
    Home: "1",
    R: "2",
    Shop: "3",
    Dynamic: "4",
    NonstandardPages: ["R"]
}

const WrapAsync = (Function) => {
    return (req, res, next) => { const FunctionOut = Function(req, res, next); return Promise.resolve(FunctionOut).catch(next); }
};

// Basic Security
require('./security/Security').Setup(App)
App.disable('x-powered-by') // epic fingerprinting gone

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
App.get('/Production.css', (req, res) => {
    res.sendFile(__dirname + "/Production/Production.css")
})
App.get('/Production.js', (req, res) => {
    res.sendFile(__dirname + "/Production/Production.js")
})
App.get('/robots.txt', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'assets/robots.txt'))
})

// Default Routing
App.get('/', WrapAsync(async function (req, res) {
    const Article = await fs.readFile('./posts/_None.md', {encoding: "utf-8"})
    let Lang = require(GetLanguagePath(req))
    let Page = await PageBuilder.GeneratePage(Article, Lang, AvailablePages, AvailablePages.Home, "")
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
                let Page = await PageBuilder.GeneratePage(Article, Lang, AvailablePages, AvailablePages.R, "");
                res.send(Page)
                break;
        }
    } else {
        let ArticlePath = './posts/' + req.params.path + '.md'
        if (fsdir.existsSync(ArticlePath) && req.params.path != "_None") { // Page exists, load into Article
            let Article = await fs.readFile('./posts/' + req.params.path + '.md', {encoding: "utf-8"})
            let Page = await PageBuilder.GeneratePage(Article, Lang, AvailablePages, AvailablePages.Dynamic, "")
            res.send(Page)
        } else {
            Log("Requested page not found (404): " + req.path)
            await SendError(404, req, res, AvailablePages, AvailablePages.Dynamic, "", Languages);
        }
    }
}))

// Error Handling Middleware
function ErrorLogger(error, req, res, next) {
    Log("ERROR: Internal Server [500]: " + error)
    next(error)
}

async function ErrorHandler(error, req, res, next) {
    if (error.type == 'redirect')
        await SendError(404, req, res, AvailablePages, AvailablePages.Dynamic, error.toString(), Languages);
    else if (error.type == 'time-out')
        await SendError(408, req, res, AvailablePages, AvailablePages.Dynamic, error.toString(), Languages);
    else
        next(error)
}

async function ErrorHandlerGeneric(error, req, res, next) {
    await SendError(500, req, res, AvailablePages, AvailablePages.Dynamic, error, Languages);
}
App.use(ErrorLogger)
App.use(ErrorHandler)
App.use(ErrorHandlerGeneric)

// Start Server
var Port = process.env.PORT || Config.App.Port;
App.listen(Port, () => {
    Log('Listening on port ' + Port)
    Log('Link: http://localhost:' + Port)
})