const router=require('express').Router(),
multer=require('multer'),
upload=multer(),
path=require('path'),
gf=require(path.join(__dirname, '../../global_functions.js'));

router.get('', (req, res)=>{
	console.log(req._parsedOriginalUrl);
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

module.exports=router;