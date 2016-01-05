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

MongoClient.connect("mongodb://172.16.4.94:30000/nonobankdb?w=-1", {
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


server.get('/hello', respond);
function respond(req, res, next) {
    //pool.acquire(function (err, db) {

    //future.then(function (result) {
    //    //console.log(result);
    //});

    db.collection('nonobanktable').insertOne({phone: 999999, ram: 0.5}, function (err, result) {

        //console.log(err);
        //res.end(JSON.stringify(result, null, 2));
        res.end('');
        //pool.release(db);
        //});
        db.close();
    });
    //res.send('hello ');
    //return next();
}

