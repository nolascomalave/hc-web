const express=require('express'),
multer=require('multer'),
upload=multer(),
redis=require('redis'),
session=require('express-session'),
MongoStore=require('connect-mongo'),
//RedisStore=require('connect-redis')(session),
//redisClient=redis.createClient(),
path=require('path'),
socketServer=require('./socket_server.js');

// Inicializando app:
const app=express();


// Settigns:
app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Session Middleware:
sessionMiddleware=session({
	store: MongoStore.create({
		mongoUrl: 'mongodb://localhost:27017/hi_connection'
	}),
	key: 'sacp-app',
	secret: 'Hi-Connection SACP',
	resave: false,
	saveUninitialized: false
});


// Middlewares:
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(sessionMiddleware);


// Routes: ----------------------------------------------------------------------------------
	// Rutas del sitio web: -----------------------------------------------------------------
app.use(require(path.join(__dirname, './routes/web/single-pages.js')));
app.use('/preguntas-frecuentes', require(path.join(__dirname, './routes/web/frequent_questions.js')));
app.use('/planes', require(path.join(__dirname, './routes/web/packages.js')));
app.use('/mail', require(path.join(__dirname, './routes/web/mail.js')));
app.use('/works', require(path.join(__dirname, './routes/web/works.js')));

	// Rutas del Sistema de Administración de Contenido Público
app.use('/sacp', require(path.join(__dirname, './routes/sacp/start.js')));
app.use('/sacp', require(path.join(__dirname, './routes/sacp/index.js')));
app.use('/sacp/planes', require(path.join(__dirname, './routes/sacp/planes.js')));



// Static Files:
app.use(express.static(path.join(__dirname, 'public')));


// Not Found response:
app.use((req, res)=>{
	//res.status(404).render(path.join(__dirname, './views/landing.ejs'));
	/*res.status(404).send({
		code: 'NOT FOUND',
		error: 404,
		message: '¡Página no encontrada!'
	});*/

	res.status(404).render('templates/web/not_found', {url: 'http://'+req.headers.host+req._parsedUrl.path});
});


// Starting Server:
const server=app.listen(app.get('port'), ()=>{
	console.log('¡Servidor Iniciado Correctamente en el puerto '+app.get('port')+'!');
});


// Starting Socket Server:
socketServer(server, sessionMiddleware);
//const io=require('socket.io')(server);


// Listening Sockets Peticion:
//io.on('connection', async (socket)=>{
	//console.log('¡Se ha detectado la conexión: '+socket.id+'!');
	/*require('./sockets/recurso_humano.js')(io, socket);
	require('./sockets/horario.js')(io, socket);
	require('./sockets/dias_libres.js')(io, socket);
	require('./sockets/asistencias.js')(io, socket);*/
	
	/*socket.on('disconnect', (reason)=>{
		
	});*/

//});