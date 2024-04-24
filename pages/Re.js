const path = require('path')
const fs = require('fs').promises

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body = require('../components/Body').Body

const Re = async (Request) => {
    return `
    ${await HTML(Request)}
    ${await Head(Request, "secret", "a thing for you to find")}
    ${await Body(Request, `
        <div class="SecretPage">
            <pre class="SecretContainer">
                ${(await fs.readFile(path.join(__dirname, "../assets/rem"), { encoding: "utf-8" }))}
            </pre>
        </div>
    `)}
    `
}
module.exports = { Re }