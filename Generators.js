const pageHead = require('./generators/Head')
const pageHeader = require('./generators/Header')
const pageBody = require('./generators/Body')
const pageFooter = require('./generators/Footer')
const pageAssemble = require('./generators/Assemble')
let Generators = {
    Head: pageHead,
    Header: pageHeader,
    Body: pageBody,
    Footer: pageFooter,
    Assembler: pageAssemble
}
module.exports = { Generators }