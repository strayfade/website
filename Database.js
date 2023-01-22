const Config = require('./Config')
const MongoClient = require('mongodb').MongoClient

let Client = null
let Database = null
let Collection = null
if (Config.MongoDB.URI != "") {
    Client = new MongoClient(Config.MongoDBL.URI);
    Database = Client.db(Config.MongoDB.Name);
    Collection = Database.collection(Config.MongoDB.Collection);
}
const Post = async function(JSON) {
    if (Config.MongoDB.URI != "")
        await Collection.insertOne(JSON);
}

module.exports = { Post }