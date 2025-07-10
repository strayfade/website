const path = require('path')
const fs = require('fs').promises

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body = require('../components/Body').Body

const Re = async (Request, BuildData) => {
    return `
    ${await HTML(Request)}
    ${await Head(Request, "secret", "a thing for you to find", BuildData)}
    ${await Body(Request, `
        <div class="SecretPage" style="background-color: black;">
            <pre class="SecretContainer" style="font-size: 10px;">
                ${(await fs.readFile(path.join(__dirname, "../assets/rem"), { encoding: "utf-8" }))}
                <p style="color: white; text-align: center;">what are you doing here?</p>
            </pre>
        </div>
    `, BuildData)}
    `
}
module.exports = { Re }