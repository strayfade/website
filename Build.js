const fs = require('fs')
const Log = require('./Log').Log
const path = require('path');
const request = require('request'); // Shop
const jsobf = require('javascript-obfuscator')
const { randomInt } = require('crypto');
const ExtraStylesheets = ["./fonts/Rajdhani.css", "./fonts/Circular.css"]
const ExtraScripts = []

const ObfuscationOptions = {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 1,
    disableConsoleOutput: false,
    domainLock: [],
    log: false,
    mangle: false,
    renameGlobals: false,
    reservedNames: [],
    rotateStringArray: true,
    seed: randomInt(32767),
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    stringArray: false,
    stringArrayEncoding: [],
    stringArrayThreshold: 0.75,
    target: 'browser',
    unicodeEscapeSequence: false
}

function GetStylesheets() {
    Log("[BUILD] - Merging stylesheet files...")
    let Stylesheet = "";
    let filenames = fs.readdirSync(path.resolve(__dirname.toString(), "css"));
    for (var x = 0; x < filenames.length; x++) {
        filenames[x] = __dirname + "/css/" + filenames[x];
    }
    for (var x = 0; x < ExtraStylesheets.length; x++) {
        filenames.push(ExtraStylesheets[x])
    }
    for (var x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith(".css")) {
            Stylesheet += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + "\n\n";
        }
    }

    for (var x = 0; x < Stylesheet.length; x++) {
        Stylesheet = Stylesheet.replace("\n", "");
        Stylesheet = Stylesheet.replace("    ", "");
    }

    fs.mkdir("./Production", (err) => { });
    let p = __dirname + "/Production/Production.css";
    fs.writeFileSync(p, Stylesheet)

    Log("[BUILD] - Finished file: " + p)
    return p
}

function GetScripts() {
    Log("[BUILD] - Merging Javascript files...")
    let Script = "";
    let filenames = fs.readdirSync(path.resolve(__dirname.toString(), "scripts"));
    for (var x = 0; x < filenames.length; x++) {
        filenames[x] = __dirname + "/scripts/" + filenames[x];
    }
    for (var x = 0; x < ExtraScripts.length; x++) {
        filenames.push(ExtraScripts[x])
    }
    for (var x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith(".js")) {
            Script += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + "\n\n";
        }
    }

    Log("[BUILD] - Obfuscating production Javascript...")
    //Script = jsobf.obfuscate(Script.toString(), ObfuscationOptions).getObfuscatedCode().toString()

    fs.mkdir("./Production", (err) => { });
    let p = __dirname + "/Production/Production.js";
    fs.writeFileSync(p, Script, { recursive: true })

    Log("[BUILD] - Finished file: " + p)
    return p
}

function CacheShopResponses() {
    let Counter = 0;
    Log("[BUILD] - Fetching Shop Responses...")
    request({
        url: 'https://api.printful.com/store/products',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.PRINTFUL_TOKEN,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PF-Store-Id': '9239885'
        }
    }, (error, response, body) => {
        body = JSON.parse(body.toString())
        for (let x = 0; x < body.result.length; x++) {
            request({
                url: 'https://api.printful.com/store/products/' + body.result[x].id,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + process.env.PRINTFUL_TOKEN,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-PF-Store-Id': '9239885'
                }
            }, (error, response, bd) => {
                bd = JSON.parse(bd)
                Log("[BUILD] - Fetched item information... [" + (x + 1) + " of " + body.result.length + "]")
                body.result[x].more = bd.result;
                Counter++;
                if (Counter == body.result.length) {
                    Log("[BUILD] - Saving all shop responses...")
                    fs.mkdir("./cache", (err) => { });
                    fs.writeFile("./cache/products.json", JSON.stringify(body), function (err) {
                        if (err)
                            console.log(err)
                    })
                    Log("[BUILD] - Cached Shop Responses!")
                }
            })
        }
    });
}

module.exports = { GetStylesheets, GetScripts, CacheShopResponses }