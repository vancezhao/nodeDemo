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

var redis_port = 6379;
var redis_host = '172.16.4.95';

//var Redis = require('ioredis');
//var redis = new Redis(redis_port, redis_host);

var Redis = require('ioredis');

var cluster = new Redis.Cluster([{
    port: 6380,
    host: '172.16.4.93'
}, {
    port: 6380,
    host: '172.16.4.97'
}, {
    port: 6380,
    host: '172.16.4.92'
}]);

var pipeline = cluster.pipeline();
var future = pipeline.set('vance_java1234561231231212312321', 'vance_java1234561231231212312321').exec();

server.listen(1338, function () {
    console.log('%s listening at %s', server.name, server.url);
});

server.get('/hello', respond);
function respond(req, res, next) {
    //pool.acquire(function (err, db) {
    future.then(function (result) {
        //console.log(result);
    });

    //db.collection('shardtable').insertOne({vancezhao: 1}, function (err, result) {
    //    //res.end(JSON.stringify(result, null, 2));
    //    //console.log(JSON.stringify(result, null, 2));
    //    //pool.release(db);
    //    //});
    //
    //});
    res.send('hello ');
    return next();
}

