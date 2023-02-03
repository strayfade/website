const { Log } = require("../Log")
const { SendError } = require("../Error")
async function ErrorLogger(error, req, res, next) {
    Log("ERROR: " + error)
    next(error)
}
async function ErrorHandler(error, req, res, next) {
    await SendError(500, req, res, AvailablePages, AvailablePages.Dynamic, error, Languages);
}
module.exports = { ErrorLogger, ErrorHandler }