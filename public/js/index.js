var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

// 	socket.emit('createEmail', {
// 		to: 'jen@examples.com',
// 		text: 'Hey, what is going on.'
// 	});
});



socket.on('disconnect', function() {
	console.log('Disconnect from server');
});

// socket.on('newEmail', function(email){
// 	console.log('New email', email);
// });

socket.on('newMessage', function(message){
	console.log('New message', message)
});