const Whitelist = ['/build/production.css', '/build/production.js']

const Middleware = async (Request, Reponse, Next) => {
    let Whitelisted = false
    for (let x = 0; x < Whitelist.length; x++) {
        if (Request.url == Whitelist[x]) Whitelisted = true
    }
    if (Whitelisted) {
        Next()
        return
    }
    let Capture = {
        ip: (Request.headers['x-forwarded-for'] || Request.connection.remoteAddress).replace('::ffff:', ''),
        path: Request.url,
        host: Request.headers['host'],
        lang: Request.headers['accept-language'],
        encoding: Request.headers['accept-encoding'],
        session: Request.headers['cookie'],
        user: Request.headers['user-agent'],
    }
    Next()
}
module.exports = { Middleware }
