const { GetLanguagePath } = require('./Localization')
const PageBuilder = require('./generators/Assemble')
const fs = require('fs/promises')

async function SendError(errNum = 500, req, res, AvailablePages, AvailablePageSelection, CustomError, Languages) {
    const ArticlePath = __dirname + '/posts/' + errNum + '.md';
    const Article = await fs.readFile(ArticlePath, {encoding: "utf-8"})
    
    let Lang = {}
    if (Languages.includes(req.params.localization))
        Lang = require('./localization/' + req.params.localization + '.json')
    else 
        Lang = require(GetLanguagePath(req))

    let Page = await PageBuilder.GeneratePage(Article, Lang, AvailablePages, AvailablePageSelection, CustomError);
    res.send(Page)
}
module.exports = { SendError }