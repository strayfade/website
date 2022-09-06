const { Generators } = require('./Generators')
function SendError(errNum, req, res, CustomError, Languages) {
    const Article = require('./posts/' + errNum + '.json')
    if (Languages.includes(req.params.localization)) { // Check if localization param is present
        let Lang = require('./localization/' + req.params.localization + '.json')
        res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, false, CustomError))
    }
    else { // No localization param, default to en-us
        let Lang = require('./localization/en-us.json')
        res.send(Generators.Assembler.GeneratePage(Article, Lang, Generators, false, CustomError))
    }
}
module.exports = { SendError }