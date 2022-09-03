const fs = require('fs')
const config = require("./config/config.json");

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

const availableLanguages = require('./localization.json')

const express = require('express')
const app = express()

// Static Directories
app.use('/assets', express.static('assets'))
app.use('/scripts', express.static('scripts'))
app.use('/fonts', express.static('fonts'))
app.use('/posts', express.static('posts'))
app.use('/css', express.static('css'))

app.get('/', (req, res) => {
    const Article = require('./posts/Homepage.json')
    let Lang = require('./localization/en-us.json')
    res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
})
app.get('/:path', (req, res) => {
    res.redirect("/en-us/" + req.params.path)
})
app.get('/:localization/:path', (req, res) => {
    let ArticlePath = './posts/' + req.params.path + '.json'
    if (fs.existsSync(ArticlePath)) {
        const Article = require('./posts/' + req.params.path + '.json')
        if (availableLanguages.includes(req.params.localization)) {
            let Lang = require('./localization/' + req.params.localization + '.json')
            res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
        }
        else {
            let Lang = require('./localization/en-us.json')
            res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
        }
    }
    else {
        const Article = require('./posts/404.json')
        if (availableLanguages.includes(req.params.localization)) {
            let Lang = require('./localization/' + req.params.localization + '.json')
            res.send(pageAssemble.GeneratePage(Article, Lang, Generators))
        }
        else {
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
