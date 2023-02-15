const fs = require('fs')
const Log = require('./Log').Log
const Obfuscator = require('js-obfuscator');
var ObfuscatorOptions = {
    keepLinefeeds: false,
    keepIndentations: false,
    encodeStrings: true,
    encodeNumbers: true,
    moveStrings: true,
    replaceNames: true,
    variableExclusions: ['^_get_', '^_set_', '^_mtd_']
};

async function PackStylesheets() {
    Log("[BUILD] - Merging CSS files...")
    let Stylesheet = "";
    let filenames = fs.readdirSync(__dirname + "/css");
    for (var x = 0; x < filenames.length; x++) {
        filenames[x] = __dirname + "/css/" + filenames[x];
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
}

async function PackScripts() {
    Log("[BUILD] - Merging Javascript files...")
    let Script = "";
    let filenames = fs.readdirSync(__dirname + "/scripts");
    for (var x = 0; x < filenames.length; x++) {
        filenames[x] = __dirname + "/scripts/" + filenames[x];
    }
    for (var x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith(".js")) {
            Script += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + "\n\n";
        }
    }

    fs.mkdir("./Production", (err) => { });
    let p = __dirname + "/Production/Production.js";
    fs.writeFileSync(p, Script, { recursive: true })
    Log("[BUILD] - Finished file: " + p)
    /*Obfuscator(Script, ObfuscatorOptions).then(function (obfuscated) {
    
    }, function (err) {
        console.error(err);
    });*/
}

PackStylesheets()
PackScripts();