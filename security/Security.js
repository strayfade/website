// Implementation of https://expressjs.com/en/advanced/best-practice-security.html
function Setup(app) {
  /* From https://expressjs.com/en/advanced/best-practice-security.html
  Reduce Fingerprinting
  By default, Express.js sends the X-Powered-By response header banner. This can be disabled using the app.disable() method:
  */
  app.disable("x-powered-by")

  /* From https://expressjs.com/en/advanced/best-practice-security.html
  Don’t use the default session cookie name
  Using the default session cookie name can open your app to attacks. The security issue posed is similar to X-Powered-By: a potential attacker can use it to fingerprint the server and target attacks accordingly.
  */
  const session = require("express-session")
  app.set("trust proxy", 1)
  app.use(session({
    secret: require("./Utilities").RandomStringWithLength(32),
    name: "sessionId",
    resave: true,
    saveUninitialized: true,
    sameSite: "strict"
  }))
}

module.exports = { Setup }