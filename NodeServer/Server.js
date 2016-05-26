var io = require('socket.io')(4567);
var shortId = require('shortid');

var clients = [];

io.on('connection', function (socket){

	var currentUser;

	socket.on('USER_CONNECT', function (data){

		for (var i = 0; i < clients.length; i++){

			socket.emit('USER_CONNECTED', {

				name : clients[i].name
				id : clients[i].id
				position : clients[i].position
			});

			console.log('Username' + clients[i].name + 'is connected');
		};
	});

	socket.on('PLAY', function (data){

		currentUser = {
			name : data.name,
			id : shortId.generate(),
			position : data.position
		}

		socket.emit('PLAY', currentUser);
		socket.broadcast.emit('USER_CONNECTED', currentUser);

	});

	socket.on('disconnect', function (data){

		socket.broadcast.emit('USER_DISCONNECTED', currentUser);
		for (var i = 0; i < clients.length; i++) {
			if (clients[i].name === currentUser.name && clients[i].id === currentUser.id) {

				console.log("User" + clients[i].name + "id :" + clients[i].id + "has disconnected");
			};
		};
	});
});

console.log("----server is running----")