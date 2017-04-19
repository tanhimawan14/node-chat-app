var socket = io();

function scrollToBottom () {
	// Selectors
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	console.log('Connected to server');

	// socket.on('welcomeMessage', function(message){
	// 	console.log(message);
	// });
});

socket.on('disconnect', function() {
	console.log('Disconnect from server');
});

socket.on('newMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// var li = $('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);

	// $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#locationMessage-template').html();
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
	// var li = $('<li></li>');
	// var a = $('<a target="_blank">My current location</a>');

	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);

	// $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextbox = $('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val('');
	});
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function (position) {
  	locationButton.removeAttr('disabled').text('Send location');
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
  	locationButton.removeAttr('disabled');
    alert('Unable to fetch location.').text('Send location');
  });
});