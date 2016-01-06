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
});


function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

process.on('message', function (m) {
    var userTypeNum = randomInt(1, 20);
    var userIdNum = randomInt(1, 10000);

    db.collection('nonobanktable').insertOne({
        userType: userTypeNum,
        userId: userIdNum
    }, function (err, result) {

        //res.end(JSON.stringify(result, null, 2));
        //console.log(JSON.stringify(result, null, 2));
        //console.log(JSON.stringify(err, null, 2));
        //pool.release(db);
        //});
        //db.close();

    });

});

