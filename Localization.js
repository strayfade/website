function GetAvailableLanguages(config) {
    var availableLanguages = require('fs').readdirSync(config.localization)
    for (var x = 0; x < availableLanguages.length; x++) {
        availableLanguages[x] = availableLanguages[x].replace(".json", "")
    }
    return availableLanguages;
}
module.exports = { GetAvailableLanguages }