var express = require("express");
var path = require("path");

var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

users = [];
connections = [];

app.get('/', function(request, response){
    response.render('index');
})


var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    // all the server socket code goes in here
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected : %s sockets connected', connections.length);

    })

    socket.on('person_added', function(data){
        console.log(data);
        var response = "New player is " + data.player;
        io.emit('server_response', {response});
        console.log(response);
    })
})
