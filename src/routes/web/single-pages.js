const router=require('express').Router(),
multer=require('multer'),
upload=multer(),
path=require('path'),
gf=require(path.join(__dirname, '../../global_functions.js'));

router.get('', (req, res)=>{
	let data={
		planes:gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/plans.json')),
		proyects: gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/briefcase.json'))
	};

	res.render('content/web/landing',{
		path:req._parsedOriginalUrl.href,
		usuario:null,
		data
	});
});

router.get('/nosotros', (req, res)=>{
	res.render('templates/web/body',{
		path:req._parsedOriginalUrl.href,
		title_page: 'Nosotros',
		title_resources: 'us',
		usuario:null,
		data:null
	});
});

module.exports=router;