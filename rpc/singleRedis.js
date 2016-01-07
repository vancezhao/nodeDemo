/**
 * Created by vancezhao on 16/1/5.
 */


var restify = require('restify');

var server = restify.createServer();

server.listen(1338, function () {
    console.log('%s listening at %s', server.name, server.url);
});

var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer;

server.get('/hello/:phone', function respond(req, res, next) {

    var client = new kafka.Client('172.16.4.91:2181,172.16.4.92:2181,172.16.4.93:2181');
    var producer = new HighLevelProducer(client);
    var phone = req.params.phone;
    //kafka
    var payloads = [
        {topic: 'test', messages: phone}
    ];
    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            producer.close();
            //console.log(data);
        });
    })
    res.send('OK');
}

/*
 var Consumer = kafka.Consumer,
 client = new kafka.Client('172.16.4.92:2181'),
 consumer = new Consumer(
 client,
 [
 { topic: 'test', partition: 0 }
 ],
 {
 autoCommit: false
 }
 );
 consumer.on('message', function (message) {
 console.log(message);
 });*/
