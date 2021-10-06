const router=require('express').Router(),
multer=require('multer'),
path=require('path'),
gf=require(path.join(__dirname, '../../global_functions.js'));

router.get('', (req, res)=>{
	/*console.log(req._parsedOriginalUrl.href);
	res.send({
		url: req.url
	});*/

	res.redirect('/#planes');
});

router.get('/:plan', (req,res)=>{
	let planes=gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/plans.json')), plan=null;

	if(planes.length>0){
		for(let i=0; i<planes.length; i++){
			if(planes[i].id===req.params.plan){
				plan=planes[i];
				break;
			}
		}
	}

	res.render('templates/web/body',{
		path:req._parsedOriginalUrl.href,
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