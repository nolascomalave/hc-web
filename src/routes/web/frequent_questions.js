const router=require('express').Router(),
multer=require('multer'),
upload=multer(),
path=require('path'),
gf=require(path.join(__dirname, '../../global_functions.js'));

router.get('', (req, res)=>{
	res.render('templates/web/body',{
		path:req._parsedOriginalUrl.href,
		title_page: 'Preguntas Frecuentes',
		title_resources: 'frequent_questions',
		usuario:null,
		data:{
			busqueda:false,
			preguntas: gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/preguntas_frecuentes.json'))
		}
	});
});

router.get('/busqueda', (req, res)=>{
	res.redirect('/preguntas-frecuentes');
});

router.post('/busqueda/', upload.none(), (req, res)=>{
	let questions=gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/preguntas_frecuentes.json')),
	busqueda=req.body.search.trim(), preguntas=[];

	questions.map(quest =>{
		if(gf.busqueda(busqueda, quest.titulo)){
			quest.pregunta=quest.titulo;
			quest.titulo=gf.resaltSearch(busqueda, quest.titulo);
			preguntas.push(quest);
		}
	});

	res.render('templates/web/body',{
		path:req._parsedOriginalUrl.href,
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

module.exports=router;