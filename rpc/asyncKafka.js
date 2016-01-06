var restify = require('restify');

var server = restify.createServer();

var cp = require('child_process');
var cp_kafka = cp.fork('./kafka.js');
var cp_mongodb = cp.fork('./mongdb.js');

server.listen(1337, function () {
    console.log('%s listening at %s', server.name, server.url);
});


server.get('/hello/:phone', respond);


function respond(req, res, next) {

    var phone = req.params.phone;

    try {
        //console.info(n.connected);
        if (!cp_kafka.connected) {
            cp_kafka = cp.fork('./kafka.js');
        }
        cp_kafka.send({phonenum: phone});
    } catch (e) {
        console.error('operator kafka error for phonenum: ' + phone);
    }

    //try {
    //    if (!cp_mongodb.connected) {
    //        cp_mongodb = cp.fork('./mongdb.js');
    //    }
    //    cp_mongodb.send({phonenum: phone});
    //} catch (e) {
    //    console.error('operator mongodb error for phone: ' + phone);
    //}
    //n.disconnect();

    res.send('OK');
    return next();
}
//n.kill('SIGHUP');




