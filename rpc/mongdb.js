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


process.on('message', function(m) {

    db.collection('nonobanktable').insertOne({id:9999, phonenum: m.phonenum}, function (err, result) {
        //res.end(JSON.stringify(result, null, 2));
        //console.log(JSON.stringify(result, null, 2));
        //console.log(JSON.stringify(err, null, 2));
        //pool.release(db);
        //});
        //db.close();
    });
});