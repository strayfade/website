const Config = require('./config/config.json')

let MongoClient = require('mongodb').MongoClient
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

module.exports = { MongoPost }