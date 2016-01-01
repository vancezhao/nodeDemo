/**
 * Created by vancezhao on 15/12/30.
 */
var restify = require('restify');
var server = restify.createServer();

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
    res.send('hello ');
}


