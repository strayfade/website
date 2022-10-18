const fs = require('fs')
const path = require('path');
const config = require('./config/config.json')
var jsobf = require('javascript-obfuscator');
const { randomInt } = require('crypto');
const ExtraStylesheets = ["./fonts/Rajdhani/Rajdhani.css", "./fonts/Xirod/Xirod.css"]
const ExtraScripts = ["./icons/js/brands.js", "./icons/js/solid.js", "./icons/js/regular.js", "./icons/js/fontawesome.js"]

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

    fs.mkdir("./src", (err) => { });
    fs.writeFileSync(__dirname + "/src/Production.css", Stylesheet)

    return __dirname + "/src/Production.css"
}

function GetScripts() {
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

    Script = jsobf.obfuscate(Script.toString(), ObfuscationOptions).getObfuscatedCode();

    fs.mkdir("./src", (err) => { });
    fs.writeFileSync(__dirname + "/src/Production.js", Script, { recursive: true })

    return __dirname + "/src/Production.js"
}

module.exports = { GetStylesheets, GetScripts }