// Import Packages
const fs = require('fs')
const path = require('path')

// Imported Functions
const { Log } = require('./Log')
const BuildTools = require('./Build')
//BuildTools.CacheShopResponses() // Must be done very early
const { SendError } = require('./Error')
const { Generators } = require('./Generators')
const { CollectAnalytics } = require('./Database')
const { GetAvailableLanguages, GetLanguage, GetLanaguageShort, GetLanguagePath } = require('./Localization')

// Import Webserver Config
const config = require("./config/config.json")

// Create App
const express = require('express')
const app = express()

const Languages = GetAvailableLanguages(config)
const AvailablePages = {
    Home: "1",
    R: "2",
    Shop: "3",
    Dynamic: "4",
    NonstandardPages: ["R", "Shop"]
}

// Basic Security Measures
require('./security/Security').Setup(app)
app.disable('x-powered-by')

// Static Directories
app.use('/cdn', express.static('cdn'))
app.use('/assets', express.static('assets'))
app.use('/fonts', express.static('fonts'))
app.use('/posts', express.static('posts'))

// Packaging
let StylesheetPath = BuildTools.GetStylesheets();
let ScriptPath = BuildTools.GetScripts();

// Analytics Middleware
let TotalRequestsServed = 0;
let TotalRequestsBlocked = 0;
app.use((req, res, next) => {
    TotalRequestsServed++;
    try {
        CollectAnalytics(req, res, config);
        Log("Serving page at path \"" + req.originalUrl + "\" [" + TotalRequestsServed + " served, " + TotalRequestsBlocked + " blocked]")
    } catch (error) {
        Log("ERROR: Error encountered while serving static page at \"" + req.originalUrl + "\":\n" + error)
        SendError(500, req, res, error, Languages);
        Log("Serving error page [500]")
    }
    next();
})

let BlacklistedPaths = [".env", "wp-", "php", "config", "xss", "sendgrid", "feed", "daemon", "boaform", "portal", "autodiscover", "vendor", "www", "api", "config", "telescope", "misc", "shell"]
// Prevents requests
app.use((req, res, next) => {
    let Found = false;
    try {
        for (let x = 0; x < BlacklistedPaths.length; x++) {
            if (req.path.toString().toLowerCase().includes(BlacklistedPaths[x].toLowerCase())) {
                Log("Blacklisted path: " + BlacklistedPaths[x])
                if (!Found) {
                    res.sendStatus(404);
                    Found = true;
                }
            }
        }
    }
    catch (error) {
        Log("ERROR: Error encountered while checking path: \n" + error)
    }
    if (!Found)
        next();
    else
        TotalRequestsBlocked++;
})

// Sources
app.get('/Production.css', (req, res) => {
    res.sendFile(StylesheetPath)
})
app.get('/Production.js', (req, res) => {
    res.sendFile(ScriptPath)
})
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'assets/robots.txt'))
})

// Default Routing
app.get('/', (req, res) => {
    const Article = require('./posts/_None.json')
    let Lang = require(GetLanguagePath(req))
    res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.Home, ""))
})
app.get('/:path', (req, res) => {
    //Log("NOTICE: Redirecting to \"/" + GetLanaguageShort(req) + "/" + req.params.path + "\"")
    res.redirect("/" + GetLanaguageShort(req) + "/" + req.params.path)
})
app.get('/:localization/:path', (req, res) => {

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
app.use(ErrorLogger)
app.use(ErrorHandler)
app.use(ErrorHandlerGeneric)

// Start Server
var Port = process.env.PORT || config.port;
app.listen(Port, () => {
    Log('Listening on port ' + Port)
    Log('Link: http://localhost:' + Port)
})