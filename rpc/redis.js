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

MongoClient.connect("mongodb://172.16.4.90:30000,172.16.4.91:30000,172.16.4.92:30000/shardb?w=0", {
    'auto_reconnect': false,
    'poolSize': 10000,
    socketOptions: {keepAlive: 3000}
}, function (err, database) {
    if (err) throw err;
    db = database;

    server.listen(1337, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
});

var redis_port = 6379;
var redis_host = '172.16.4.95';
var Redis = require('ioredis');
var redis = new Redis(redis_port, redis_host);
var pipeline = redis.pipeline();
var future = pipeline.set('vance_java3', 'vance_java3').exec();


server.get('/hello', respond);
function respond(req, res, next) {
    //pool.acquire(function (err, db) {
    future.then(function (result) {
        //console.log(result);
    });
    db.collection('shardtable').save({vancezhao: 1}, function (err, result) {
        //res.end(JSON.stringify(result, null, 2));
        //console.log(JSON.stringify(result, null, 2));
        //pool.release(db);
        //});

    });
    res.send('hello ');
}

