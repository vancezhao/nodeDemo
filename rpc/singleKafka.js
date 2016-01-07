/**
 * Created by vancezhao on 16/1/1.
 */

var restify = require('restify');
var server = restify.createServer();
var mongodb = require("mongodb");

var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer,
    client = new kafka.Client('172.16.4.92:2181,172.16.4.93:2181,172.16.4.94:2181'),
    producer = new HighLevelProducer(client);

var accesslog = require('access-log');
var format = 'url=":url" method=":method" statusCode=":statusCode" delta=":delta" ip=":ip"';

//var monitor = require('monitor');
//monitor.start();

var apache_log = require('apache-log');
apache_log.data.settings({
    directory: '/var/log/apache2/', // directory to the log file
    filename: 'access.log', // file name of the log file
    format: 'combined',    // "common" is a shorter format. Default is "combined". See apache clf docs for details
}); // parse the cli input as well (see object-parse module for details)

server.listen(1338, function () {
    //console.log('%s listening at %s', server.name, server.url);
});

server.get('/hello/:phone', function (req, res, next) {
    ////pool.acquire(function (err, db) {

    //var phone = req.params.phone;
    ////sync send msg
    sendMsg(phone);

    //apache_log.logger(req, res);
    res.send('OK');
    return next();
});


function sendMsg(phone) {

    var payloads = [
        {topic: 'kaikai_18', messages: phone}
    ]
    producer.send(payloads, function (err, data) {
        //console.log(data);
    });

}
