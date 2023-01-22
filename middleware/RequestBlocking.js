const Log = require("../Log").Log
const BlacklistedPaths = [".env", "wp-", "php", "config", "xss", "sendgrid", "feed", "daemon", "boaform", "portal", "autodiscover", "vendor", "www", "api", "config", "telescope", "misc", "shell"]

const Middleware = function (Request, Response, Next) {
    for (let x = 0; x < BlacklistedPaths.length; x++) {
        if (Request.path.toString().toLowerCase().includes(BlacklistedPaths[x].toLowerCase())) {
            Log("Blacklisted path: " + BlacklistedPaths[x])
            if (!Responded) {
                TotalRequestsBlocked++;
                Response.sendStatus(404);
                return;
            }
        }
    }
    Next();
}
module.exports = { Middleware }