// Import Packages
const fs = require('fs')
const path = require('path')

// Imported Functions
const { Log } = require('./Log')
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
    Dynamic: "3",
    NonstandardPages: ["R"]
}

// Basic Security Measures
require('./security/Security').Setup(app)
app.disable('x-powered-by')

// Static Directories
app.use('/assets', express.static('assets'))
app.use('/fonts', express.static('fonts'))
app.use('/posts', express.static('posts'))

// Packaging
const BuildTools = require('./Build')
let StylesheetPath = BuildTools.GetStylesheets();
let ScriptPath = BuildTools.GetScripts();

// Analytics Middleware
app.use((req, res, next) => {
    try {
        if (!req.originalUrl.endsWith(".css") && !req.originalUrl.endsWith(".js")) {
            Log("Serving page at \"" + req.originalUrl + "\"")
            CollectAnalytics(req, res, config);
        }
    }
    catch(error) {
        Log("ERROR: Error encountered while serving static page at \"" + req.originalUrl + "\":\n" + error)
        SendError(500, req, res, error, Languages);
        Log("Serving error page [500]")
    }
    next();
})

// Sources
app.get('/Production.css', (req, res) => {
    res.sendFile(StylesheetPath)
})
app.get('/Production.js', (req, res) => {
    res.sendFile(ScriptPath)
})
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'robots.txt'))
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
        //Log("Requested page tagged: IsNotArticle")
        switch(req.params.path) {
            case "R":
                res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.R, ""))
                break;
        }
    }
    else {
        //Log("Requested page tagged: IsArticle")
        let ArticlePath = './posts/' + req.params.path + '.json'
        if (fs.existsSync(ArticlePath)) { // Page exists, load into Article
            let Article = require('./posts/' + req.params.path + '.json')
            res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePages.Dynamic, ""))
        }
        else {
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