// require('./config/config.js');

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

// 	socket.emit('newEmail', {
// 		from: 'mike@example.com',
// 		text: 'Hey, what is going on.',
// 		createAt: 123
// 	});

// 	socket.on('createEmail', (newEmail) => {
// 		console.log('createEmail', newEmail);
// 	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('Disconnect from server');
	});
});


server.listen(port, () => {
	console.log(`Started up at port ${port}`);
});