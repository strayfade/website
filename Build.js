const fs = require('fs')
const path = require('path')
const { Log, LogColors } = require('./Log')

const JSProcessorOptions = {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    domainLock: [],
    domainLockRedirectUrl: 'about:blank',
    forceTransformStrings: [],
    identifierNamesCache: null,
    identifierNamesGenerator: 'hexadecimal',
    identifiersDictionary: [],
    identifiersPrefix: '',
    ignoreImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    optionsPreset: 'default',
    renameGlobals: true,
    renameProperties: true,
    renamePropertiesMode: 'safe',
    reservedNames: [],
    reservedStrings: [],
    seed: 0,
    selfDefending: false,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    sourceMapSourcesMode: 'sources-content',
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexesType: ['hexadecimal-number'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    target: 'browser',
    transformObjectKeys: false,
    unicodeEscapeSequence: true,
}

const CSSProcessorOptions = {
    level: 2,
}

const CSSProcessor = require('clean-css')
const JSProcessor = require('javascript-obfuscator')

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
    
    Stylesheet = new CSSProcessor(CSSProcessorOptions).minify(Stylesheet).styles;

    fs.mkdir('./build', (err) => {})
    let OutputFile = path.join(__dirname, '/build/prod.css')
    fs.writeFileSync(OutputFile, Stylesheet)

    Log(`[BUILD] - Finished file: ${OutputFile}`, LogColors.Success)
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

    Script = JSProcessor.obfuscate(Script, JSProcessorOptions).getObfuscatedCode()

    fs.mkdir('./build', (err) => {})
    let OutputFile = path.join(__dirname, '/build/prod.js')
    fs.writeFileSync(OutputFile, Script, { recursive: true })

    Log(`[BUILD] - Finished file: ${OutputFile}`, LogColors.Success)
}

PackStylesheets()
PackScripts()
