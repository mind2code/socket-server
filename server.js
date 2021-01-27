var app = require('express');
var cors = require('cors')
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

server.listen(8001);

var count = 0;
var $ipsConnected = [];

io.on('connection', function(socket) {
    
    var $ipAddress = socket.handshake.address;
    if(!$ipsConnected.hasOwnProperty($ipAddress)) {
        $ipsConnected[$ipAddress] = 1;
        count++;
        socket.emit('counter', {count:count});

    }

    console.log("client is connected");

    /* Disconnect socket */
    socket.on('disconnect', function(){
        if($ipsConnected.hasOwnProperty($ipAddress)) {
            delete $ipsConnected[$ipAddress];
            count--;
            socket.emit('counter', {count:count});
        }
    });
});

/*
app.listen(8001, function(){
    console.log("server started on port 8001");
});
*/