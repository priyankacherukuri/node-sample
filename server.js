var http = require('http');
var vash = require('vash');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set("view engine", "vash");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    
var io = require('socket.io').listen(80);
io.sockets.on('connection', function (socket) {
    // On establishment of the connection, "socket" is recieved for the connected browser
    socket.on('massage', function (data) {
        // In case you need to communicate to all the connected client, we use "io.sockets".
        io.sockets.emit('publish', data)
        console.log(data);
    });
});
app.get('/', function (eq, res) {
    res.render("index", {});
});
var server = http.createServer(app);
server.listen(8000);
