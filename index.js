const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io').listen(server);





const port = 3000;

server.listen(port)


//server.listen(3000);

app.get('/', function (request, respons) {
    respons.sendFile(__dirname + "/index.html")
});


let users = [];
let connections = [];

socketIo.on('connection', socket => {
    console.log("Your are connected");
    connections.push(socket);

    socket.on('disconnect', data => {
        console.log("You are disocnnect");
    })

    socket.on('send message', data => {
        socketIo.sockets.emit('add message', {
            message: data.message,
            name:data.name,
            className : data.className
        });
    })
})


console.log(connections);