var http = require('http');
var profiler = require('v8-profiler');

var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer;

var zookeeper = require('node-zookeeper-client');

//var client = new kafka.Client('192.168.1.133:2181,192.168.1.134:2181,1?92.168.1.135:2181', 'vance', {}),
//var urlString ="192.168.1.133:2181,192.168.1.134:2181,192.168.1.135:2181";

var urlString = "172.16.4.92:2181,172.16.4.93:2181,172.16.4.94:2181";
var zkOptions = {requireAcks: 0, ackTimeoutMs: 100};

var noAckBatchOptions = {noAckBatchSize: 500, noAckBatchAge: 300};
var client = new kafka.Client(urlString, ''),
    producer = new HighLevelProducer(client,zkOptions);

var payloads = [
    {topic: 'kaikai_18', messages: 'This is the First Message I am sending', attributes: 2},
];

producer.on('error', function (err) {
    console.log('error data' + err);
});

http.createServer(function (req, res) {

    //res.end('Hello World\n');
    //sendMsg(123);
    //    producer 'on' ready to send payload to kafka.
    //producer.on('ready', function () {

    sendMsg(payloads);

    //setTimeout(function () {
    //    sendMsg(payloads);
    //}, 1);

    return res.end('Hello World\n');

    //producer.send(payloads, function (err, data) {
    //    console.log('senging');
    //    console.log(data);
    //    producer.close();
    //});

    //setTimeout(function () {
    //    var profile = profiler.stopProfiling('Vance');
    //    profiler.deleteAllProfiles();
    //}, 1000);

}).listen(1338, function () {

});

function sendMsg(payloads) {

    //var payloads = [
    //    {topic: 'kaikai', messages: phone}
    //]

    producer.send(payloads, function (err, data) {
        //console.log(data);
    });
}