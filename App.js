// Import Packages
const fs = require('fs/promises')
const fsdir = require('fs')
const path = require('path')
const express = require('express')

// Imported Functions
const { Log } = require('./Log')
const { SendError } = require('./Error')
const { GeneratePageCached } = require('./generators/Assemble')
const { GetAvailableLanguages, GetLanaguageShort, GetLanguagePath } = require('./Localization')

// Create App
const App = express()

const Languages = GetAvailableLanguages()
const AvailablePages = {
    Home: Symbol('Home'),
    Dynamic: Symbol('Article'),
    R: Symbol('R'),
}
const IrregularPages = ['R']

const WrapAsync = (Function) => {
    return (req, res, next) => {
        const FunctionOut = Function(req, res, next)
        return Promise.resolve(FunctionOut).catch(next)
    }
}

// Basic Security
require('./security/Security').Setup(App)

// Static Directories
App.use('/cdn', express.static('cdn'))
App.use('/assets', express.static('assets'))
App.use('/fonts', express.static('fonts'))
App.use('/build', express.static('build'))

// Middleware
const Analytics = require('./middleware/Analytics')
App.use(Analytics.Middleware)
const RequestBlocking = require('./middleware/RequestBlocking')
App.use(RequestBlocking.Middleware)

// Sources
App.get(
    '/favicon.ico',
    WrapAsync(async (req, res) => {
        res.sendFile(path.resolve(__dirname, 'assets/Icon.ico'))
    }),
)
App.get(
    '/robots.txt',
    WrapAsync(async (req, res) => {
        res.sendFile(path.resolve(__dirname, 'assets/robots.txt'))
    }),
)

// Default Routing
App.get(
    '/',
    WrapAsync(async (req, res) => {
        const Article = await fs.readFile('./posts/_None.md', { encoding: 'utf-8' })
        let Lang = require(GetLanguagePath(req))
        let Page = await GeneratePageCached(req, Article, Lang, AvailablePages, AvailablePages.Home, '')
        res.send(Page)
    }),
)
App.get(
    '/:path',
    WrapAsync(async (req, res) => {
        res.redirect('/' + GetLanaguageShort(req) + '/' + req.params.path)
    }),
)
App.get(
    '/:localization/:path',
    WrapAsync(async (req, res) => {
        let Lang = {}
        if (Languages.includes(req.params.localization))
            Lang = require('./localization/' + req.params.localization + '.json')
        else Lang = require(GetLanguagePath(req))

        let IsNotArticle = IrregularPages.includes(req.params.path.toUpperCase())
        if (IsNotArticle) {
            switch (req.params.path.toUpperCase()) {
                case 'R':
                    let Article = await fs.readFile('./posts/_None.md', { encoding: 'utf-8' })
                    let Page = await GeneratePageCached(req, Article, Lang, AvailablePages, AvailablePages.R, '')
                    res.send(Page)
                    break
            }
        } else {
            let ArticlePath = './posts/' + req.params.path + '.md'
            if (fsdir.existsSync(ArticlePath) && req.params.path != '_None') {
                let Article = await fs.readFile('./posts/' + req.params.path + '.md', { encoding: 'utf-8' })
                let Page = await GeneratePageCached(
                    req,
                    Article,
                    Lang,
                    AvailablePages,
                    AvailablePages.Dynamic,
                    '',
                    req.params.path + '.md',
                )
                res.send(Page)
            } else {
                Log('Requested page not found (404): ' + req.path)
                await SendError(404, req, res, AvailablePages, AvailablePages.Dynamic, '', Languages)
            }
        }
    }),
)

// Error Handling Middleware
const ErrorLogger = async (error, req, res, next) => {
    Log('ERROR: ' + error)
    next(error)
}
const ErrorHandler = async (error, req, res, next) => {
    await SendError(500, req, res, AvailablePages, AvailablePages.Dynamic, error, Languages)
}
App.use(ErrorLogger)
App.use(ErrorHandler)

// Start Server
let Port = process.env.PORT || parseInt(process.argv[2])
App.listen(Port, () => {
    Log('Listening on port ' + Port)
    Log('Link: http://localhost:' + Port)
})
