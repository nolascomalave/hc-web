const router=require('express').Router(),
multer=require('multer'),
upload=multer(),
path=require('path'),
gf=require(path.join(__dirname, '../../global_functions.js')),
nodemailer=require('nodemailer'),
transporter=nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	service: 'gmail',
	auth:{
		user:'ventas.hiconnection@gmail.com',
		pass:'rgxpschiqpuyvkpb'
	}
});

transporter.verify().then(()=>{
	console.log('¡App lista para enviar correos!');
});

router.post('/contact', upload.none(), (req, res, next)=>{
	let errores={}, datos=req.body;

	if(('names' in datos)==false){
		errores.names='¡Faltan los nombres entre los datos de envío!';
	}

	if(('email' in datos)==false){
		errores.email='¡Falta el correo electrónico entre los datos de envío!';
	}

	if(('tlf' in datos)==false){
		errores.tlf='¡Falta el número telefónico entre los datos de envío!';
	}

	if(('message' in datos)==false){
		errores.message='¡Falta el mensaje entre los datos de envío!';
	}

	if(Object.keys(errores).length>0){
		res.send({
			errno:'NOT EXIST VALUES',
			errores
		});
	}else{
		next();
	}
}, (req, res, next)=>{
	let { names, email, tlf, message }=req.body, errores={}, valid=true;

	errores.names=gf.validateDoubleName(names, 'nombre', 'apellido', true);
	errores.email=gf.validateEmail(email, true);
	errores.tlf=gf.validatePhone(tlf);
	errores.message=gf.validateSimpleText(message, true);

	for(i in errores){
		if(errores[i]!=null){
			valid=false;
			break;
		}
	}

	if(valid==true){
		let html=`
			<p><b>Nombre y apellido:</b> `+gf.sanitizeString(gf.firstCharName(names))+`</p>
			<p><b>Email:</b> `+gf.sanitizeString(email.toLowerCase())+`</p>
		`;

		if(tlf.trim().length>0){
			html=html.trim()+'<p><b>Número de teléfono:</b> '+gf.sanitizeString(tlf)+'</p><br>';
		}

		html=html.trim()+'<p><b>Mensaje:</b><br> '+gf.sanitizeString(message)+'</p><br>';

		let mailOptions={
			from: 'ventas.hiconnection@gmail.com',
			to: 'ventas.hiconnection@gmail.com',
			subject: 'Mensaje de '+gf.firstCharName(names)+' desde nuestro formulario de contacto.',
			html
		};

		transporter.sendMail(mailOptions, (err, inf)=>{
			if(err){
				err.errno='SEND ERROR';
				res.send(err);
			}else{
				res.send({
					success: 'SENDED EMAIL',
					message: '¡Mensaje enviado correctamente!'
				});
			}
		})
	}else{
		res.send({
			errno:'ERROR IN VALUES',
			errores
		});
	}
});

router.post('/solicite-plan', upload.none(), (req, res, next)=>{
	let errores={}, datos=req.body;

	if(('name' in datos)==false){
		errores.name='¡Falta el nombre entre los datos de envío!';
	}

	if(('middle_name' in datos)==false){
		errores.middle_name='¡Falta el apellido entre los datos de envío!';
	}

	if(('doc' in datos)==false){
		errores.doc='¡Falta el documento de identificación entre los datos de envío!';
	}

	if(('email' in datos)==false){
		errores.email='¡Falta el correo electrónico entre los datos de envío!';
	}

	if(('tlf' in datos)==false){
		errores.tlf='¡Falta el número telefónico entre los datos de envío!';
	}

	if(('address' in datos)==false){
		errores.message='¡Falta la dirección entre los datos de envío!';
	}

	if(('message' in datos)==false){
		errores.message='¡Falta el mensaje entre los datos de envío!';
	}

	if(('package' in datos)==false || datos.package.length<1){
		errores.package='¡Falta el valor del paquete entre los datos de envío!';
	}

	if(Object.keys(errores).length>0){
		res.send({
			errno:'NOT EXIST VALUES',
			errores
		});
	}else{
		next();
	}
}, async (req, res, next)=>{
	let { name, middle_name, email, tlf, address, message, doc, package }=req.body, name_doc='Cédula de Identidad',
	char_doc='V', errores={}, valid=true, planes=gf.getJSONDocument(path.join(__dirname, '../../ExamplesDB/plans.json')),
	typeDoc=doc.replace(/[^VCERPGJ]/g, '').toUpperCase(), plan=null;

	doc=gf.extractNumberInText(doc);
	char_doc=typeDoc.charAt(0);

	errores.name=gf.validateName(name, 'nombre', true);
	errores.middle_name=gf.validateName(middle_name, 'apellido');

	if(typeDoc=='VC' || typeDoc=='EC'){
		errores.doc=gf.validateCi(doc, 1, 9, true);
		doc=gf.puntoDigito(doc);
	}else{
		errores.doc=gf.validateRif(char_doc+doc, true);
		name_doc='RIF';
		doc=gf.rifFormat(char_doc+doc);
	}

	errores.email=gf.validateEmail(email, true);
	errores.tlf=gf.validatePhone(tlf, true);
	errores.address=gf.validateSimpleText(address, true);
	errores.message=gf.validateSimpleText(message);

	for(i in errores){
		if(errores[i]!=null){
			valid=false;
			break;
		}
	}

	for(let i=0; i<planes.length; i++){
		if(planes[i].id===package){
			plan=planes[i];
			break;
		}
	}

	if(plan==null){
		errores.package='¡El plan seleccionado no está registrado!';
		valid=false;
	}

	if(valid==true){
		let envioSelfMail=null, envioClientMail, html=`
			<h2><b>Instalación del paquete: `+plan.name+`</b></h2><br>
			<p><b>Nombre y apellido:</b> `+gf.sanitizeString(gf.firstCharName(name))+' '+gf.sanitizeString(gf.firstCharName(middle_name))+`</p>
			<p><b>`+name_doc+`:</b> `+doc+`</p>
			<p><b>Email:</b> `+gf.sanitizeString(email.toLowerCase())+`</p>
			<p><b>Número de teléfono:</b> `+gf.sanitizeString(tlf)+`</p>
			<p><b>Dirección:</b> `+gf.sanitizeString(address)+`</p>
		`;

		if(message.trim().length>0){
			html=html.trim()+'<p><b>Mensaje:</b><br> '+gf.sanitizeString(message)+'</p><br>';
		}

		let mailOptions={
			from: 'ventas.hiconnection@gmail.com',
			to: 'ventas.hiconnection@gmail.com',
			subject: 'Mensaje de '+gf.firstCharName(name)+' para realizar instalación.',
			html
		};

		try{
			envioSelfMail=await transporter.sendMail(mailOptions);
		}catch(e){
			res.send(e);
		}

		if(envioSelfMail){
			let mailClientOptions={
				from:'ventas.hiconnection@gmail.com',
				to:email.toLowerCase(),
				subject: 'Hemos recibido su solicitud.',
				html: `<h2>Su solicitud ha sido recibida. Lo contactaremos pronto a través de los medios que ha indicado.</h2><br><br>
					<h3><b>Instalación del paquete `+plan.name+` por `+plan.denominator_price+plan.price+`</b></h3><br><br>
					<h3><b>Datos del cliente</b></h3><br>
					<p><b>Nombre y Apellido:</b> `+gf.sanitizeString(gf.firstCharName(name))+' '+gf.sanitizeString(gf.firstCharName(middle_name))+`</p>
					<p><b>`+name_doc+`:</b> `+doc+`</p>
					<p><b>Email:</b> `+gf.sanitizeString(email.toLowerCase())+`</p>
					<p><b>Número de teléfono:</b> `+gf.sanitizeString(tlf)+`</p>
					<p><b>Dirección:</b> `+gf.sanitizeString(address)+`</p>
				`
			};
			try{
				envioClientMail=await transporter.sendMail(mailClientOptions);
			}catch(e){
				envioClientMail=null;
			}
		}

		res.send({
			success: 'SENDED EMAIL',
			message: '¡Mensaje enviado correctamente!',
			envioCliente:envioClientMail
		});
	}else{
		res.send({
			errno:'ERROR IN VALUES',
			errores
		});
	}
});

module.exports=router;