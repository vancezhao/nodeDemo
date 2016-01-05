/**
 * Created by vancezhao on 16/1/4.
 */

/**
 * Created by vancezhao on 16/1/1.
 */
/**
 * Created by vancezhao on 15/12/30.
 */
var restify = require('restify');
var server = restify.createServer();
var mongodb = require("mongodb");
var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer,
    client = new kafka.Client('172.16.4.92:2181'),
    producer = new HighLevelProducer(client);

var monitor = require('monitor');
monitor.start();


producer.on('ready', function () {

});


var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var db;

// Connection URL
var url = 'mongodb://172.16.4.90:30000/shardb';

MongoClient.connect("mongodb://172.16.4.90:30000,172.16.4.91:30000,172.16.4.92:30000/shardb?w=-1", {
    'auto_reconnect': false,
    'poolSize': 10000,
    socketOptions: {keepAlive: 10000}
}, function (err, database) {
    if (err) throw err;
    db = database;

    server.listen(1338, function () {
        //console.log('%s listening at %s', server.name, server.url);
    });
});


server.get('/hello/:phone', respond);

function respond(req, res, next) {
    //pool.acquire(function (err, db) {

    var phone = req.params.phone;
    //sync send msg
    sendMsg(phone);

    //sync send mongodb
    db.collection('shardtable').insertOne({id: 9999999, phonenum: phone}, function (err, result) {

        //res.end(JSON.stringify(result, null, 2));
        //console.log(JSON.stringify(result, null, 2));
        //console.log(JSON.stringify(error, null, 2));
        //pool.release(db);
        //});

        db.close();
    });

    res.send('OK');
    return next();
}

function sendMsg(phone) {
    var payloads = [
        {topic: 'testTopic', messages: phone}
    ]
    producer.send(payloads, function (err, data) {
        //console.log(data);
    });
}
