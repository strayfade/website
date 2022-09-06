const fs = require('fs')
const geoip = require('geoip-lite')
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
            encoding: req.client._readableState.defaultEncoding,
            route: req.route.path,
            method: req.route.methods
        },
        timestamp: new Date().toUTCString().replace(",", "")
    }
}
function CollectAnalytics(req, res, config) {
    const body = GetAnalyticsFromRequest(req)
    body.location = geoip.lookup(body.connection.ip)
    if (!fs.existsSync(config.analytics)) {
        fs.mkdirSync(config.analyticsPath, { recursive: true })
        fs.writeFileSync(config.analytics, "[]")
    }
    fs.readFile(config.analytics, 'utf-8', function (err, data) {
        if (err) {
            res.sendStatus(503)
        }
        let Data = JSON.parse(data)
        Data.push(body)
        fs.writeFile(config.analytics, JSON.stringify(Data), function (err) { })
    })
}
module.exports = { CollectAnalytics }