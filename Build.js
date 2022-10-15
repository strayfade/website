const fs = require('fs')
const path = require('path');
const ExtraStylesheets = ["./fonts/Rajdhani/Rajdhani.css", "./fonts/Xirod/Xirod.css"]
const ExtraScripts = ["./icons/js/brands.js", "./icons/js/solid.js", "./icons/js/regular.js", "./icons/js/fontawesome.js"]
function GetStylesheets() {
    let Stylesheet = "";
    let filenames = fs.readdirSync(__dirname + "\\css\\");
    for (var x = 0; x < filenames.length; x++) {
        filenames[x] = __dirname + "\\css\\" + filenames[x];
    }
    for (var x = 0; x < ExtraStylesheets.length; x++) {
        filenames.push(ExtraStylesheets[x])
    }
    for (var x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith(".css")) {
            Stylesheet += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + "\n\n";
        }
    }

    fs.mkdir("./src", (err) => {});
    fs.writeFileSync(__dirname + "/src/Production.css", Stylesheet)

    return __dirname + "/src/Production.css"
}

function GetScripts() {
    let Script = "";
    let filenames = fs.readdirSync(__dirname + "\\scripts\\");
    for (var x = 0; x < filenames.length; x++) {
        filenames[x] = __dirname + "\\scripts\\" + filenames[x];
    }
    for (var x = 0; x < ExtraScripts.length; x++) {
        filenames.push(ExtraScripts[x])
    }
    for (var x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith(".js")) {
            Script += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + "\n\n";
        }
    }

    fs.mkdir("./src", (err) => {});
    fs.writeFileSync(__dirname + "/src/Production.js", Script, { recursive: true })

    return __dirname + "/src/Production.js"
}

module.exports = { GetStylesheets, GetScripts }