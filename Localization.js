const fs = require('fs')

function GetLanguage(req) {
    return req.headers["accept-language"].split(",")[0].toLowerCase();
}
function GetLanaguageShort(req) {
    var LocalePath = GetLanguage(req).split("-")[0]
    return LocalePath
}
function GetLanguagePath(req) {
    var LocalePath = "./localization/" + GetLanguage(req).split("-")[0] + ".json"
    return fs.existsSync(LocalePath) ? LocalePath : "./localization/en.json"
}
function GetAvailableLanguages(config) {
    var availableLanguages = require('fs').readdirSync(config.localization)
    for (var x = 0; x < availableLanguages.length; x++) {
        availableLanguages[x] = availableLanguages[x].replace(".json", "")
    }
    return availableLanguages;
}
module.exports = { GetAvailableLanguages, GetLanguage, GetLanaguageShort, GetLanguagePath }