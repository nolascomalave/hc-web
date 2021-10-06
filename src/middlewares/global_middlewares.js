function comprobateSession(req, res, next){
	req.session.user={
		username: 'MALAVEN',
		name: 'Nolasco',
		middle_name: 'Malavé',
		type_user: 'Developer',
		access:1,
		id:'g1fgh53c8b855629cbe55ae9'
	};

	if(req.session.user){
		next();
	}else{
		res.redirect('/sacp/login/');
	}
}

function comprobateAjaxSession(req, res, next){
	//delete req.session.user;
	req.session.user={
		username: 'MALAVEN',
		name: 'Nolasco',
		middle_name: 'Malavé',
		type_user: 'Developer',
		access:1,
		id:'g1fgh53c8b855629cbe55ae9'
	};
	if(req.session.user){
		next();
	}else{
		res.send({
			errno:'NOT LOGINED USER',
			message:'¡No existe una sesión abierta!',
		});
	}
}

module.exports={
	comprobateSession,
	comprobateAjaxSession
}