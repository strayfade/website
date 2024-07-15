const Log = require('./Log').Log
const BlacklistedPaths = [
    '.env',
    'wp-',
    'php',
    'config',
    'xss',
    'sendgrid',
    'feeds',
    'daemon',
    'boaform',
    'portal',
    'autodiscover',
    'vendor',
    'www',
    'api',
    'telescope',
    'misc',
    'shell',
]

let RequestAnalytics = {
    TotalRequestsBlocked: 0,
    TotalRequestsServed: 0,
}
const Middleware = (Request, Response, Next) => {
    for (let x = 0; x < BlacklistedPaths.length; x++) {
        if (Request.path.toString().toLowerCase().includes(BlacklistedPaths[x].toLowerCase())) {
            //Log('Blacklisted path: ' + BlacklistedPaths[x])
            RequestAnalytics.TotalRequestsBlocked++
                Response.sendStatus(404)
            return
        }
    }
    RequestAnalytics.TotalRequestsServed++
        Next()
}
module.exports = { Middleware, RequestAnalytics }