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

//var kafka = require('kafka-node'),
//    HighLevelProducer = kafka.HighLevelProducer,
//    client = new kafka.Client('172.16.4.90:2181'),
//    producer = new HighLevelProducer(client);
//
//producer.on('ready', function () {
//
//});

//var redis_port = 6379;
//var redis_host = '172.16.4.95';
//var Redis = require('ioredis');
//var redis = new Redis(redis_port, redis_host);
//
//var pipeline = redis.pipeline();
//var future = pipeline.set("123", "123").exec();

server.listen(1338, function () {
    //console.log('%s listening at %s', server.name, server.url);
});

// Connection URL
server.get('/hello/:phone', respond);

function respond(req, res, next) {
    //pool.acquire(function (err, db) {

    var phone = req.params.phone;
    //console.log(phone);

    //pool.acquire(function (err, db) {
    //future.then(function (result) {
    //    //console.log(result);
    //});

    //sync send msg
    //sendMsg(phone);

    res.send('OK');
    //return next();
}

function sendMsg(phone) {
    var payloads = [
        {topic: 'testTopic', messages: phone}
    ]
    producer.send(payloads, function (err, data) {
        //console.log(data);
    });
}
