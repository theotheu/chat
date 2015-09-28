var express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);

	var users = {}; 
	
server.listen(3000);
app.get("/", function (req, res) {
    res.sendfile(__dirname + "/index.html");
});

io.sockets.on("connection", function (socket) {
	
	//io.sockets.emit("newMessage", 'a user connected');

	var userName;
	socket.on('newUser',function(user){
		userName = user;
		//users[user.name] = socket;
		io.sockets.emit('newMessage', user + " has joined.");
	});

    socket.on('message', function(msg){
		io.sockets.emit('message', msg);
		msg = userName + ": " + msg;
		io.sockets.emit("newMessage", msg);
	});
	
    socket.on("sendMessage", function (data) {
        io.sockets.emit("newMessage", data);
    });
	
	socket.on('disconnect', function(){
		//io.sockets.emit("newMessage", 'a user disconnected');
		io.sockets.emit("newMessage", userName + " has left the server.");
        //delete users[socket.id];
	});

});
