const router=require('express').Router(),
multer=require('multer'),
uploadNone=multer().none();

router.get('/home', (req, res)=>{
	res.render('templates/sacp/index',{
		title_page: 'Inicio',
		icon: 'home',
		title_resources: 'start',
		data: null
	});
});

module.exports=router;