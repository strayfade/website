const fs = require('fs')
const Config = require('./Config')

function GetLanguage(req) {
    return (req.headers["accept-language"] ? req.headers["accept-language"] : "en-US").split(",")[0].toLowerCase();
}
function GetLanaguageShort(req) {
    var LocalePath = GetLanguage(req).split("-")[0]
    return LocalePath
}
function GetLanguagePath(req) {
    var LocalePath = "./localization/" + GetLanguage(req).split("-")[0] + ".json"
    return fs.existsSync(LocalePath) ? LocalePath : "./localization/en.json"
}
function GetAvailableLanguages() {
    var AvailableLanguages = fs.readdirSync(Config.Localization.Directory)
    for (var x = 0; x < AvailableLanguages.length; x++) {
        AvailableLanguages[x] = AvailableLanguages[x].replace(".json", "")
    }
    return AvailableLanguages;
}
module.exports = { GetAvailableLanguages, GetLanguage, GetLanaguageShort, GetLanguagePath }