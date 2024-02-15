const fs = require('fs')
const Log = require('./Log').Log
const Obfuscator = require('js-obfuscator')
const ObfuscatorOptions = {
    keepLinefeeds: false,
    keepIndentations: false,
    encodeStrings: true,
    encodeNumbers: true,
    moveStrings: true,
    replaceNames: true,
    variableExclusions: ['^_get_', '^_set_', '^_mtd_'],
}
const Obfuscate = !process.argv[2] || !process.argv[2].includes('--skipobfuscation')

const PackStylesheets = async () => {
    Log('[BUILD] - Merging CSS files...')
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

    fs.mkdir('./build', (err) => {})
    let p = __dirname + '/build/production.css'
    fs.writeFileSync(p, Stylesheet)

    Log('[BUILD] - Finished file: ' + p)
}

const PackScripts = async () => {
    Log('[BUILD] - Merging Javascript files...')
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

    if (Obfuscate) {
        Obfuscator(Script, ObfuscatorOptions).then(
            (ObfuscatedContent) => {
                let p = __dirname + '/build/production.js'
                Log('[BUILD] - Obfuscated file: ' + p)
                fs.mkdir('./Production', (err) => {})
                fs.writeFileSync(p, ObfuscatedContent, { recursive: true })

                Log('[BUILD] - Finished file: ' + p)
            },
            (Error) => {
                console.error(Error)
            },
        )
    } else {
        Log('[BUILD] - Skipping obfuscation')
        fs.mkdir('./Production', (err) => {})
        let p = __dirname + '/build/production.js'
        fs.writeFileSync(p, Script, { recursive: true })
    }
}

PackStylesheets()
PackScripts()
