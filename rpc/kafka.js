
var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer,
    client = new kafka.Client('172.16.4.92:2181'),
    producer = new HighLevelProducer(client);
producer.on('ready', function () {

});

process.on('message', function(m) {
    var payloads = [
        {topic: 'test1', messages: m.phonenum}
    ]
    producer.send(payloads, function (err, data) {
        //console.log(data);
    });
});
