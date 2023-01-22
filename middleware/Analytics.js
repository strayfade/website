const Database = require("../Database")
const Whitelist = ["/Production.css", "/Production.js"]

const Middleware = async function(Request, Reponse, Next) {
    let Whitelisted = false;
    for (var x = 0; x < Whitelist.length; x++) {
        if (Request.url == Whitelist[x])
            Whitelisted = true;
    }
    if (Whitelisted) {
        Next();
        return;
    }
    let Capture = {
        ip: (Request.headers['x-forwarded-for'] || Request.connection.remoteAddress).replace("::ffff:", ""),
        path: Request.url,
        host: Request.headers['host'],
        lang: Request.headers['accept-language'],
        encoding: Request.headers['accept-encoding'],
        session: Request.headers['cookie'],
        user: Request.headers['user-agent']
    }
    await Database.Post(Capture)
    Next();
}
module.exports = { Middleware }