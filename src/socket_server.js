module.exports= function (server, sessionMiddleware){
	const io=require('socket.io')(server);

	//client.subscribe('plan');

	io.use((socket, next)=>{
		sessionMiddleware(socket.request, socket.request.res, next);
	});

	/*client.on('message', (message)=>{
		console.log(hola);
	});*/

	// Sockets Routes: -----------------------------------------
	io.on('connection', async (socket)=>{
		//console.log(socket.request);

		// Rutas: ----------------------------------------------

		// Planes:
		//require('./sockets/sacp/client/planes.js')(io, socket);
	});


	// Redis Routes:
	require('./sockets/sacp/redis/planes.js')(io);
}