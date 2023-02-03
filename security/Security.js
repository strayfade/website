// Implementation of https://expressjs.com/en/advanced/best-practice-security.html
function Setup(App) {

    /* From https://expressjs.com/en/advanced/best-practice-security.html
    Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    helmet.contentSecurityPolicy which sets the Content-Security-Policy header. This helps prevent cross-site scripting attacks among many other things.
    helmet.hsts which sets the Strict-Transport-Security header. This helps enforce secure (HTTPS) connections to the server.
    helmet.frameguard which sets the X-Frame-Options header. This provides clickjacking protection.
    */

    const Helmet = require("helmet")
    App.use(Helmet({
        contentSecurityPolicy: {
            directives: {
                ...Helmet.contentSecurityPolicy.getDefaultDirectives(),
                "script-src": ["'self'", "'unsafe-inline'"],
                "script-src-attr": null // Fixes errors in some browsers (I'm looking at you, Firefox)
            },
        },
    }))

    /* From https://expressjs.com/en/advanced/best-practice-security.html
    Reduce Fingerprinting
    By default, Express.js sends the X-Powered-By response header banner. This can be disabled using the app.disable() method:
    */
    App.disable("x-powered-by")

    /* From https://expressjs.com/en/advanced/best-practice-security.html
    Don’t use the default session cookie name
    Using the default session cookie name can open your app to attacks. The security issue posed is similar to X-Powered-By: a potential attacker can use it to fingerprint the server and target attacks accordingly.
    */
    const session = require("express-session")
    App.set("trust proxy", 1)
    App.use(session({
        secret: require('./Utilities').RandomStringWithLength(32),
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
            maxAge: 60 * 60 * 24 * 1000
        }
    }));
}

module.exports = { Setup }