/**
 * Created by vancezhao on 16/1/5.
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
var poolModule = require('generic-pool');

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var db;

// Connection URL
var url = 'mongodb://172.16.4.90:30000/shardb';

MongoClient.connect("mongodb://172.16.4.94:30000/userdb?w=-1", {
    'auto_reconnect': false,
    'poolSize': 10000,
    socketOptions: {keepAlive: 10000}
}, function (err, database) {
    if (err) throw err;
    db = database;

    server.listen(1338, function () {
        console.log('Hi %s listening at %s', server.name, server.url);
    });
});

//var redis_port = 6379;
//var redis_host = '172.16.4.95';
//var Redis = require('ioredis');
//var redis = new Redis(redis_port, redis_host);
//var pipeline = redis.pipeline();
//var future = pipeline.set('vance_java4', 'vance_java4').exec();

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

server.get('/hello', respond);
function respond(req, res, next) {
    //pool.acquire(function (err, db) {

    //future.then(function (result) {
    //    //console.log(result);
    //});

    var userTypeNum = randomInt(1, 20);
    var userIdNum = randomInt(1, 100000);
    console.log("userType: " + userTypeNum + " userId: " + userIdNum);

    db.collection('usertable').insertOne({userType: userTypeNum, userId: userIdNum}, function (err, result) {
        //console.log(JSON.stringify(result, null, 2));
        //res.end(JSON.stringify(result, null, 2));
        //pool.release(db);
        //});
        db.close();
    });

    res.send('hello ');
    //return next();
}


