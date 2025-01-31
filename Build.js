const fs = require('fs')
const path = require('path')
const { log, logColors } = require('./Log')

const CSSProcessorOptions = {
    level: 2,
}

const CSSProcessor = require('clean-css')
const JSProcessor = require('javascript-obfuscator')

let CurrentStylesheet = "";
let CurrentScript = "";

const PackStylesheets = async () => {
    log('[BUILD] - Merging CSS files...')
    let Stylesheet = ''
    let filenames = fs.readdirSync(__dirname + '/css')
    for (let x = 0; x < filenames.length; x++) {
        filenames[x] = __dirname + '/css/' + filenames[x]
    }
    for (let x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith('.css')) {
            Stylesheet += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + '\n\n'
        }
    }

    for (let x = 0; x < Stylesheet.length; x++) {
        Stylesheet = Stylesheet.replace('\n', '')
        Stylesheet = Stylesheet.replace('    ', '')
    }
    
    Stylesheet = new CSSProcessor(CSSProcessorOptions).minify(Stylesheet).styles;

    fs.mkdir('./build', (err) => {})
    let OutputFile = path.join(__dirname, '/build/prod.css')
    fs.writeFileSync(OutputFile, Stylesheet)

    CurrentStylesheet = Stylesheet

    log(`[BUILD] - Finished file: ${OutputFile}`, logColors.Success)
}

const PackScripts = async () => {
    log('[BUILD] - Merging Javascript files...')
    let Script = ''
    let filenames = fs.readdirSync(__dirname + '/scripts')
    for (let x = 0; x < filenames.length; x++) {
        filenames[x] = __dirname + '/scripts/' + filenames[x]
    }
    for (let x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith('.js')) {
            Script += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + '\n\n'
        }
    }

    //Script = JSProcessor.obfuscate(Script, JSProcessorOptions).getObfuscatedCode()

    fs.mkdir('./build', (err) => {})
    let OutputFile = path.join(__dirname, '/build/prod.js')
    fs.writeFileSync(OutputFile, Script, { recursive: true })
    
    CurrentScript = Script

    log(`[BUILD] - Finished file: ${OutputFile}`, logColors.Success)
}

PackStylesheets()
PackScripts()

module.exports = { CurrentStylesheet, CurrentScript }