const Config = require('./config/config.json')

const MongoClient = require('mongodb').MongoClient
const Client = new MongoClient(Config.databaseUri);
const Database = Client.db(Config.databaseName);
const Collection = Database.collection(Config.databaseCollectionName);

async function MongoPost(JSON) {
    await Collection.insertOne(JSON);
}
async function MongoGet() {
    const Output = await Collection.findOne({});
    return Output;
}

module.exports = { MongoPost, MongoGet }