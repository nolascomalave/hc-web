const path=require('path'),
gf=require('./public/JS/librerias/global_functions.js'),
fs=require('fs');

gf.ssre=(string)=>{
	let chars='\\/-^[]()|\'"`+$?¡¿!*.{}<>';

	for(let i=0; i<chars.length; i++){
		string=string.replace(eval('/\\'+chars.charAt(i)+'/gi'), '\\'+chars.charAt(i));
	}

	return string;
}

gf.regularExpressionVocalGroup=(string)=>{
	let mal='aáäàâeéèêëiíïîìoóòôöuúûùü', bien='aaaaeeeeiiiioooouuuu', abc='abcdefghijklmnñopqrstuvwxyz';
	let a_group='[aáäàâ]', e_group='[eéèêë]', i_group='[iíïîì]', o_group='[oóòôö]', u_group='[uúûùü]';
	let result='';

	for(let i=0; i<string.length; i++){
		let numero=0, changed=false;
		for(let j=0; j<mal.length; j++){
			if(string.charAt(i)==mal.charAt(j) || string.charAt(i).toUpperCase()==mal.charAt(j).toUpperCase()){
				numero=j;
				changed=true;
				break;
			}
		}

		if(changed==true){
			if(numero<5){
				result=result+'('+a_group+'|'+a_group.toUpperCase()+')';
			}else if(numero<10){
				result=result+'('+e_group+'|'+e_group.toUpperCase()+')';
			}else if(numero<14){
				result=result+'('+i_group+'|'+i_group.toUpperCase()+')';
			}else if(numero<19){
				result=result+'('+o_group+'|'+o_group.toUpperCase()+')';
			}else{
				result=result+'('+u_group+'|'+u_group.toUpperCase()+')';
			}
		}else{
			result=result+string.charAt(i);
		}
	}

	//return string;
	return result;
}

gf.busqueda=(busqueda, place)=>{
	let regExp=/ /gi;
	busqueda=gf.ssre(busqueda);
	busqueda=gf.regularExpressionVocalGroup(busqueda);
	regExp=eval('/'+busqueda+'/gi');
	return regExp.test(place);
}

gf.resaltSearch=(busqueda, place)=>{
	busqueda=gf.ssre(busqueda);
	busqueda=gf.regularExpressionVocalGroup(busqueda);
	let coincidencias=place.match(eval('/'+busqueda+'/gi')), founds=[];

	if(coincidencias!=null){
		for(let i=0; i<coincidencias.length; i++){
			let exist=false;

			for(let j=0; j<founds.length; j++){
				if(founds[j]==coincidencias[i]){
					exist=true;
					break;
				}
			}

			if(exist==false){
				place=place.replace(eval('/'+coincidencias[i]+'/g'), '<b class="resalted">'+coincidencias[i]+'</b>');
				founds.push(coincidencias[i]);
			}
		}
	}

	return place;
}


// Funciones del Servidor:
gf.deleteFile=(file)=>{
	if(fs.existsSync(file)){
		fs.unlinkSync(file);
	}
}

gf.moveFiles=(oldFile, newFile)=>{
	if(fs.existsSync(oldFile)){
		let data=fs.readFileSync(oldFile);
		if(data){
			fs.writeFileSync(newFile, data);
			deleteFile(oldFile);
		}
	}
}

gf.validateVarsInFunction=(vars, req, res, next, file)=>{
	if(gf.existInJSON(vars, req.body).valid==true){
		next();
	}else{
		if(file){
			gf.deleteFile(file);
		}
		res.send({
			errno: 'INCOMPLETE VALUES',
			message: '¡Faltan valores para realizar la operación!'
		});
	}
}

gf.getJSONDocument=(file)=>{
	if(fs.existsSync(file)){
		return JSON.parse(fs.readFileSync(file).toString());
	}else{
		return {
			errno:'NOT FOUND FILE',
			message: '¡Archivo no encontrado!'
		};
	}
}

module.exports=gf;