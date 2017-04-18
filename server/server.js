// require('./config/config.js');

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generatedMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generatedMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generatedMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', generatedMessage(message.from, message.text));
	});

	socket.on('disconnect', () => {
		console.log('Disconnect from server');

		socket.broadcast.emit('newMessage', generatedMessage('Admin', 'Someone leave!'));
	});
});


server.listen(port, () => {
	console.log(`Started up at port ${port}`);
});