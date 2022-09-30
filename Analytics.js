const GeoLookup = require('geoip-lite').lookup
const { MongoPost } = require('./Database')
const fs = require('fs')
function GetAnalyticsFromRequest(req) {
    let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace("::ffff:", "")
    if (ip == "127.0.0.1") {
        ip += " (Local)"
    }
    return {
        host: req.headers['host'],
        path: req.originalUrl,
        connection: {
            ip: ip,
            userAgent: req.headers['user-agent'],
            type: req.headers['connection'],
            accepts: req.headers['accept'],
            acceptsLanguage: req.headers['accept-language'],
            encoding: req.client._readableState.defaultEncoding
        },
        timestamp: new Date().toUTCString().replace(",", "")
    }
}
function CollectAnalytics(req, res, config) {
    const Body = GetAnalyticsFromRequest(req)
    Body.location = GeoLookup(Body.connection.ip)
    MongoPost(Body)
}
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
module.exports = { CollectAnalytics, GetLanguagePath, GetLanguage, GetLanaguageShort }