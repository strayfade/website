// Import Packages
const fs = require('fs')
const path = require('path')
const express = require('express')

// Imported Functions
const { Log } = require('./Log')
const { SendError } = require('./Error')
const { Generators } = require('./Generators')
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
    NonstandardPages: ["R", "Shop"]
}

// Basic Security
require('./security/Security').Setup(App)
App.disable('x-powered-by')

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
App.get('/', (req, res) => {
    const Article = require('./posts/_None.json')
    let Lang = require(GetLanguagePath(req))
    res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.Home, ""))
})
App.get('/:path', (req, res) => {
    //Log("NOTICE: Redirecting to \"/" + GetLanaguageShort(req) + "/" + req.params.path + "\"")
    res.redirect("/" + GetLanaguageShort(req) + "/" + req.params.path)
})
App.get('/:localization/:path', (req, res) => {

    var Lang = require(GetLanguagePath(req))
    if (Languages.includes(req.params.localization)) { // Check if localization param is present
        Lang = require('./localization/' + req.params.localization + '.json')
    }

    let IsNotArticle = AvailablePages.NonstandardPages.includes(req.params.path);
    if (IsNotArticle) {
        let Article = require('./posts/_None.json')
        switch (req.params.path) {
            case "R":
                res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.R, ""))
                break;
            case "Shop":
                res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.Shop, ""))
                break;
        }
    } else {
        let ArticlePath = './posts/' + req.params.path + '.json'
        if (fs.existsSync(ArticlePath)) { // Page exists, load into Article
            let Article = require('./posts/' + req.params.path + '.json')
            res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.Dynamic, ""))
        } else {
            Log("Requested page not found (404): " + req.path)
            SendError(404, req, res, AvailablePages, AvailablePages.Dynamic, "", Languages);
        }
    }
})

// Error Handling Middleware
function ErrorLogger(error, req, res, next) {
    Log("ERROR: Internal Server [500]:\n" + error)
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
App.use(ErrorLogger)
App.use(ErrorHandler)
App.use(ErrorHandlerGeneric)

// Start Server
var Port = process.env.PORT || Config.App.Port;
App.listen(Port, () => {
    Log('Listening on port ' + Port)
    Log('Link: http://localhost:' + Port)
})