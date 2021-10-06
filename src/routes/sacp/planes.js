require('../../connection.js');

// Paquetes:
const router=require('express').Router(),
multer=require('multer'),
upload=multer(),
client=require('redis').createClient(),
path=require('path'),
gf=require('../../global_functions.js'),
fs=require('fs');

// Middlewares:
const gm= require('../../middlewares/global_middlewares.js');

// Redis Client Channel Definition:
//client.

// Schemas de Mongoose:
const planes=require('../../models/Plan.js'),
planes_categorias=require('../../models/category_plan.js');

// ----------------------------------------------------------------------------------------------
// Multer Settings: -----------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
const storageImgPlan= multer.diskStorage({
	destination: path.join(__dirname, '../../public/server-files/content/planes/'),
	filename: (req, file, funcion)=>{
		funcion(null, 'image_'+Date.now()+file.originalname.substr(file.originalname.lastIndexOf('.'), file.originalname.length-1));
	}
});

const uploadImgPlan=multer({
	storage: storageImgPlan
}).single('img');
// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------

router.get('/', gm.comprobateSession, async (req, res)=>{
	let categorias= await planes_categorias.find({},{name:true});
	let plans=await planes.find();

	for(let i=0; i<plans.length; i++){
		plans[i].complete_category=await planes_categorias.findOne({_id:plans[i].category},{name:true});
		plans[i].formated_price=gf.extractNumberInText(plans[i].price.toString()).substring(0, gf.extractNumberInText(plans[i].price.toString()).length-2);
	}

	res.render('templates/sacp/index',{
		title_page: 'Planes',
		icon: 'boxes',
		title_resources: 'planes',
		data: {
			categorias,
			plans
		}
	});
});

router.post('/add', gm.comprobateAjaxSession, uploadImgPlan, (req, res, next)=>{
	let vars=[
		'type_category',
		'category',
		'name',
		'price',
		'description',
		'caracteristicas'
	];

	gf.validateVarsInFunction(vars, req, res, next, path.join(__dirname, '../../public/server-files/content/planes/'+req.file.filename));
}, async (req, res)=>{
	let errors={}, valid=true, { type_category, category, name, price, description, caracteristicas }=req.body, { file }=req,
	errorsCaracteristicas=[], category_attr=null, plan_attr=null, deleteImg=()=>{
		gf.deleteFile(path.join(__dirname, '../../public/server-files/content/planes/'+file.filename));
	};

	category=gf.destilde(category.toUpperCase());
	name=name.toUpperCase();

	try{
		category_attr= await planes_categorias.findOne({name: category}, {name:true});
		if(category_attr!=null){
			plan_attr= await planes.findOne({name: name, category: category_attr._id.toString()}, {name:true});
		}
	}catch(e){
		deleteImg();
		res.send({
			errno: 'DATABASE ERROR',
			reason: e.reason,
			message: e.message
		});
	}

	if(type_category=='true' || type_category==true){
		errors.category=gf.validateSimpleText(category.trim(), 'tipo de plan', 30, true);
		if(errors.category==null){
			if(category_attr!=null){
				errors.category='¡La categoría definida ya existe!';
			}
		}
	}else{
		errors.category=null;
		if(category_attr==null){
			errors.category='¡La categoría no se encuentra registrada!';
		}
	}

	errors.name=gf.validateSimpleText(name, 'nombre', 30, true);
	if(plan_attr!=null && errors.name==null){
		errors.name='¡Ya existe el plan '+name+' en la categoría '+category+'!';
	}

	errors.price=gf.validateMoney(price, '$', true);
	errors.description=gf.validateSimpleText(description, 'descripción', 500, true, 'La');

	if((typeof caracteristicas)=='string'){
		let err=gf.validateSimpleText(caracteristicas, 'característica', 100, true, 'La');
		errorsCaracteristicas=[err];

		if(err){
			valid=false;
		}
	}else{
		let i=1, features=[];
		caracteristicas.map((caracteristica)=>{
			let err=null, obligatory=false;
			
			if(i=1){
				obligatory=true;
			}

			err=gf.validateSimpleText(caracteristica, 'característica', 100, obligatory, 'La');
			errorsCaracteristicas.push(err);
			if(err){
				valid=false;
			}else if(caracteristica.trim().length>0 && valid==true){
				features.push(gf.sanitizeString(caracteristica));
			}
			i++;
		});
		caracteristicas=features;
		features=[];
	}

	for(i in errors){
		if(errors[i]!=null){
			valid=false;
			break;
		}
	}

	errors.caracteristicas=errorsCaracteristicas;

	if(valid){
		let date=new Date();

		try{
			if(type_category=='true' || type_category==true){
				category_attr= await planes_categorias.create({
					name: gf.sanitizeString(category),
					date_creation: date,
					date_update: date,
					author: req.session.user.id
				});
			}

			if((typeof caracteristicas)=='string'){
				caracteristicas=[caracteristicas];
			}

			let new_plan=await planes.create({
				name: gf.sanitizeString(name),
				price: gf.extractNumberInText(price),
				date_creation: date,
				date_update: date,
				category: category_attr._id.toString(),
				description: gf.sanitizeString(description),
				caracteristicas: caracteristicas,
				img:req.file.filename,
				author: req.session.user.id,
				updater: req.session.user.id
			});

			client.publish('planes', JSON.stringify({
				request:'new',
				plan:new_plan,
				category:category_attr
			}));

			res.send({
				success: 'SUCCESS',
				message: '¡Se ha registrado el plan correctamente!'
			});
		}catch(e){
			deleteImg();
			res.send({
				errno: 'DATABASE ERROR',
				reason: e.reason,
				message: e.message
			});
		}
	}else{
		deleteImg();
		res.send({
			errno: 'INVALID DATA',
			errors
		});
	}
});

module.exports=router;