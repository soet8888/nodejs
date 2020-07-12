const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });

// Check db's client connection
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server...");
});

//initiate database 
function DB() {
    this.client = client
    this.db = client.db(dbName)
}
// close client connection
DB.prototype.close = () => {
    DB.call(this)
    this.client.close();
}
// inserts multiple documents
DB.prototype.inserts = (collectionName, data, callback) => {
    DB.call(this)
    const collection = this.db.collection(collectionName);
    collection.insertMany(data
        , (err, result) => {
            callback(err, result);
        });
}
DB.prototype.find = (collectionName, where, callback) => {
    DB.call(this)
    const collection = this.db.collection(collectionName);
    collection.find(where).toArray((err, docs) => {
        callback(err, docs);
    });
}
DB.prototype.insert = (collectionName, data, callback) => {
    DB.call(this)
    const collection = this.db.collection(collectionName)
    collection.insertOne(data, (err, doc) => callback(err, doc))
}
DB.prototype.update = (collectionName, where, set, callback) => {
    DB.call(this)
    const collection = this.db.collection(collectionName)
    collection.updateOne(data, { $set: set }, (err, doc) => callback(err, doc))
}
DB.prototype.remove = (collectionName, where, callback) => {
    DB.call(this)
    const collection = this.db.collection(collectionName)
    collection.deleteOne(where, (err, doc) => callback(err, doc))
}
module.exports = new DB()