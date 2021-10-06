const mongoose=require('mongoose'),
uri='mongodb://localhost:27017/hi_connection';

/*async function connect(){
	try{
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000
		});

		const db= await mongoose.connection;
		
		db.once('open', ()=>{
			console.log('¡La base de datos ha sido conectada en "'+uri+'"!');
		});

		db.on('error', (err)=>{
			console.log(err);
		});
	}catch(e){
		if(e.message=='connect ECONNREFUSED 127.0.0.1:27017'){
			console.log('¡Ha ocurrido un error al establecen la conexión con la base de datos "'+uri+'"!');
		}else{
			console.log(e.message);
		}
	}
}*/

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000
});

const db= mongoose.connection;

db.once('open', ()=>{
	console.log('¡La base de datos ha sido conectada en "'+uri+'"!');
});

db.on('error', (err)=>{
	console.log(err);
});

module.exports=db;