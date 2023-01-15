const Config = require('./config/config.json')
const MongoClient = require('mongodb').MongoClient

let Client = null
let Database = null
let Collection = null
if (Config.databaseUri != "") {
    Client = new MongoClient(Config.databaseUri);
    Database = Client.db(Config.databaseName);
    Collection = Database.collection(Config.databaseCollectionName);
}
async function MongoPost(JSON) {
    if (Config.databaseUri != "")
        await Collection.insertOne(JSON);
}

function GetAnalyticsFromRequest(req) {
    let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace("::ffff:", "")
    if (ip == "127.0.0.1") {
        ip += " (Local)"
    }
    return {
        ip: ip,
        path: req.originalUrl,
        connection: {
            userAgent: req.headers['user-agent'],
            type: req.headers['connection'],
            accepts: req.headers['accept'],
            acceptsLanguage: req.headers['accept-language'],
            encoding: req.client._readableState.defaultEncoding
        },
        timestamp: new Date().toUTCString().replace(",", "")
    }
}
function CollectAnalytics(req, res, config) {
    MongoPost(GetAnalyticsFromRequest(req))
}

module.exports = { CollectAnalytics, GetAnalyticsFromRequest }