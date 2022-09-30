const { Generators } = require('./Generators')
const { GetLanguagePath } = require('./Localization')

function SendError(errNum, req, res, AvailablePages, AvailablePageSelection, CustomError, Languages) {
    const Article = require('./posts/' + errNum + '.json')
    var Lang = require(GetLanguagePath(req))
    if (Languages.includes(req.params.localization)) { // Check if localization param is present
        Lang = require('./localization/' + req.params.localization + '.json')
    }
    res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, AvailablePages, AvailablePageSelection, CustomError, getEmoji(GetLanguage(req))))
}
module.exports = { SendError }