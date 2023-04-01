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
const Obfuscate = process.argv0.includes("--skipobfuscation");

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

    if (Obfuscate) {
        Obfuscator(Script, ObfuscatorOptions).then(function (obfuscated) {
            let p = __dirname + "/Production/Production.js";
            Log("[BUILD] - Obfuscated file: " + p)
            fs.mkdir("./Production", (err) => { });
            fs.writeFileSync(p, obfuscated, { recursive: true })

            Log("[BUILD] - Finished file: " + p)
        }, function (err) {
            console.error(err);
        });
    }
    else {
        Log("[BUILD] - Skipping obfuscation")
        fs.mkdir("./Production", (err) => { });
        let p = __dirname + "/Production/Production.js";
        fs.writeFileSync(p, Script, { recursive: true })
    }
}

PackStylesheets()
PackScripts();