/**
 * Created by vancezhao on 15/12/30.
 */
var restify = require('restify');
var server = restify.createServer();

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
//BSON = require('mongodb').pure().BSON,
    assert = require('assert');

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

var redis_port = 6379;
var redis_host = '172.16.4.95';
var Redis = require('ioredis');
var redis = new Redis(redis_port, redis_host);
var pipeline = redis.pipeline();
var future = pipeline.set('vance_java3', 'vance_java3').exec();

server.get('/hello', respond);
function respond(req, res, next) {

    future.then(function (result) {
        //console.log(result);
    });

    MongoClient.connect('mongodb://172.16.4.90:30000,172.16.4.91:30000,172.16.4.92:30000/shardb?w=1', function (err, db) {
        assert.equal(null, err);
        assert.ok(db != null);

        var insertDocuments = function (db, callback) {
            // Get the documents collection
            var collection = db.collection('documents');
            // Insert some documents
            collection.insertMany([
                {vancetestonly: 1}
            ], function (err, result) {
                //assert.equal(err, null);
                //assert.equal(3, result.result.n);
                //assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the document collection");
                callback(result);
            });
        }

        insertDocuments(db, function () {
            db.close();
        });

    });

    res.send('hello ');
}


