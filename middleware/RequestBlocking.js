const Log = require("../Log").Log
const BlacklistedPaths = [".env", "wp-", "php", "config", "xss", "sendgrid", "feed", "daemon", "boaform", "portal", "autodiscover", "vendor", "www", "api", "telescope", "misc", "shell"]

let TotalRequestsBlocked = 0;
let TotalRequestsServed = 0;
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
    TotalRequestsServed++
    Next();
}
module.exports = { Middleware }