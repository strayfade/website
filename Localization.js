const fs = require('fs')

const GetLanguage = (req) => {
    return (req.headers['accept-language'] ? req.headers['accept-language'] : 'en-US').split(',')[0].toLowerCase()
}
const GetLanaguageShort = (req) => {
    let LocalePath = GetLanguage(req).split('-')[0]
    return LocalePath
}
const GetLanguagePath = (req) => {
    let LocalePath = './localization/' + GetLanguage(req).split('-')[0] + '.json'
    return /*fs.existsSync(LocalePath) ? LocalePath :*/ './localization/en.json'
}
const GetAvailableLanguages = () => {
    let AvailableLanguages = fs.readdirSync('./localization')
    for (let x = 0; x < AvailableLanguages.length; x++) {
        AvailableLanguages[x] = AvailableLanguages[x].replace('.json', '')
    }
    return AvailableLanguages
}
module.exports = { GetAvailableLanguages, GetLanguage, GetLanaguageShort, GetLanguagePath }
