const router=require('express').Router(),
multer=require('multer'),
upload=multer(),
path=require('path'),
fs=require('fs'),
gf=require(path.join(__dirname, '../../global_functions.js'));

router.get('', (req, res)=>{
	let data={
		planes:gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/plans.json')),
		proyects: gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/briefcase.json'))
	};

	res.render('content/web/landing',{
		path:req._parsedUrl.path,
		usuario:null,
		data
	});
});

router.get('/nosotros', (req, res)=>{
	res.render('templates/web/body',{
		path:req._parsedUrl.path,
		title_page: 'Nosotros',
		title_resources: 'us',
		usuario:null,
		data:null
	});
});

router.get('/preguntas-frecuentes', (req, res)=>{
	let file=path.join(__dirname, '../../ExamplesDB/preguntas_frecuentes.json'), busqueda=req.body.search;

	if(fs.existsSync(file)){
		file=JSON.parse(fs.readFileSync(file).toString());
	}

	res.render('templates/web/body',{
		path:req._parsedUrl.path,
		title_page: 'Preguntas Frecuentes',
		title_resources: 'frequent_questions',
		usuario:null,
		data:{
			busqueda:false,
			preguntas: file
		}
	});
});

router.get('/preguntas-frecuentes/busqueda', (req, res)=>{
	res.redirect('/preguntas-frecuentes');
});

router.post('/preguntas-frecuentes/busqueda/', upload.none(), (req, res)=>{
	let file=path.join(__dirname, '../../ExamplesDB/preguntas_frecuentes.json'), busqueda=req.body.search.trim(), preguntas=[];

	if(fs.existsSync(file)){
		file=JSON.parse(fs.readFileSync(file));
	}

	file.map(quest =>{
		if(gf.busqueda(busqueda, quest.titulo)){
			quest.pregunta=quest.titulo;
			quest.titulo=gf.resaltSearch(busqueda, quest.titulo);
			preguntas.push(quest);
		}
	});

	res.render('templates/web/body',{
		path:req._parsedUrl.path,
		title_page: 'Preguntas Frecuentes',
		title_resources: 'frequent_questions',
		usuario:null,
		data:{
			busqueda:true,
			preguntas,
			search:busqueda
		}
	});
});


router.get('/planes/:plan', (req,res)=>{
	let planes=gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/plans.json')), plan=null;

	if(planes.length>0){
		planes.map(el =>{
			if(el.id===req.params.plan){
				plan=el;
			}
		});
	}

	res.render('templates/web/body',{
		path:req._parsedUrl.path,
		title_page: 'Solicitar Paquete',
		title_resources: 'package_request',
		usuario:null,
		data:{
			plan,
			planes
		}
	});
});

module.exports=router;