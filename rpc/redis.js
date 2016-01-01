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

server.listen(1337, function () {
    console.log('%s listening at %s', server.name, server.url);
});

var redis_port = 6379;
var redis_host = '172.16.4.95';
var Redis = require('ioredis');
var redis = new Redis(redis_port, redis_host);
var pipeline = redis.pipeline();
var future = pipeline.set('vance_java3', 'vance_java3').exec();


//var kafka = require('kafka-node');
//var Producer = kafka.Producer;
//var KeyedMessage = kafka.KeyedMessage;
//var Client = kafka.Client;
//var client = new Client('172.16.4.92:9092');
//var argv = require('optimist').argv;
//var topic = argv.topic || 'topic1';
//var p = argv.p || 0;
//var a = argv.a || 0;
//var producer = new Producer(client, {requireAcks: 1});
//
//producer.on('ready', function () {
//    var message = 'a message';
//    var keyedMessage = new KeyedMessage('keyed', 'a keyed message');
//    console.log('start to send');
//
//    producer.send([
//        {topic: topic, partition: p, messages: [message, keyedMessage], attributes: a}
//    ], function (err, result) {
//        console.log(err || result);
//        process.exit();
//    });
//});
//
//producer.on('error', function (err) {
//    console.log('error', err)
//});

server.get('/hello', respond);
function respond(req, res, next) {

    future.then(function (result) {
        //console.log(result);
    });

    MongoClient.connect('mongodb://172.16.4.90:30000,172.16.4.91:30000,172.16.4.92:30000/shardb', {
        server: {
            poolSize: 500
            , autoReconnect: false
            , socketOptions: {
                noDelay: false
                , keepAlive: 100
                , connectTimeoutMS: 444444
                , socketTimeoutMS: 555555
            }
        }
    }, function (err, db) {
        assert.equal(null, err);
        assert.ok(db != null);

        var insertDocuments = function (db, callback) {
            // Get the documents collection
            var collection = db.collection('documents');
            // Insert some documents
            collection.insertOne([
                {vancetestonly: 1}
            ], function (err, result) {
                //assert.equal(err, null);
                //assert.equal(3, result.result.n);
                //assert.equal(3, result.ops.length);
                callback(result);
            });
        }

        insertDocuments(db, function () {
            db.close();
        });

    });

    res.send('hello ');
}


