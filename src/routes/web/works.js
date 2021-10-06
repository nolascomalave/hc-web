const router=require('express').Router(),
multer=require('multer'),
upload=multer(),
path=require('path'),
gf=require(path.join(__dirname, '../../global_functions.js'));

var uno=true;

router.post('/client', upload.none(), (req, res)=>{
	let proyects= gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/briefcase.json')), proyect=null, data={};
	for(let i=0; i<proyects.length; i++){
		if(proyects[i].id===req.body.id){
			proyect=proyects[i];
			break;
		}
	}

	if(proyect){
		data={
			success:'¡Se ha encontrado el proyecto requerido!',
			proyect
		}
	}else{
		data={
			errno:'NOT FOUND',
			message:'¡El proyecto requerido no se encuentra en nuestra base de datos!'
		}
	}

	res.send(data);
});

module.exports=router;