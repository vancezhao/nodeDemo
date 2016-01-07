var http = require('http');

var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer,
    client = new kafka.Client('172.16.4.92:2181'),
    producer = new HighLevelProducer(client);

var payloads = [
    {topic: 'kaikai_18', messages: 'This is the First Message I am sending', partition: 0},
];

producer.on('error', function (err) {
    console.log('error data' + err);
});


http.createServer(function (req, res) {
    res.end('Hello World\n');
    //sendMsg(123);
    //    producer 'on' ready to send payload to kafka.
    //producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        //console.log('senging');
        //console.log(data);
        //producer.close();
    });
    //});
}).listen(1338, function () {

});

function sendMsg(phone) {
    var payloads = [
        {topic: 'kaikai_18', messages: phone}
    ]
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
}