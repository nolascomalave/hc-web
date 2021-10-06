// Útiles: ----------------------------------------------------------------------------------------------

function extractNumberInText(text){
	return text.replace(/[^0-9]/g, '').toString();
}

function extractNumberInTextAndSeparattor(text){
	text=text.replace(/\-\-/g, '-');
	text=text.replace(/  /g, ' ');
	text=text.replace(/\- /, '-');
	text=text.replace(/ \-/, ' ');
	return text.replace(/([^0-9 \-]|^ |^\-)/g, '');
}

function sanitizeString(string){
	string=string.trim();
	string=string.replace(/\</gi, '&lt;');
	string=string.replace(/\>/gi, '&gt;');
	string=string.replace(/\"/gi, '&quot;');
	return string;
}

function destilde(string){
	let a='[áäàâ]', e='[éèêë]', i='[íïîì]', o='[óòôö]', u='[úûùü]';
	string=string.replace(eval('/'+a+'/g'), 'a');
	string=string.replace(eval('/'+e+'/g'), 'e');
	string=string.replace(eval('/'+i+'/g'), 'i');
	string=string.replace(eval('/'+o+'/g'), 'o');
	string=string.replace(eval('/'+u+'/g'), 'u');

	string=string.replace(eval('/'+a.toUpperCase()+'/g'), 'A');
	string=string.replace(eval('/'+e.toUpperCase()+'/g'), 'E');
	string=string.replace(eval('/'+i.toUpperCase()+'/g'), 'I');
	string=string.replace(eval('/'+o.toUpperCase()+'/g'), 'O');
	return string.replace(eval('/'+u.toUpperCase()+'/g'), 'U');
}

function quitSpace(string){
	return string.replace(/\ /gi, '');
}

function HTMLSpecialsChars(text){
	text=text.replace(/<[^>]*\>/g, '');
	return text;
}

function isLetter(char){
	let valid=false;
	if((char.charCodeAt(0)>64 && char.charCodeAt(0)<383) && ((char.charCodeAt(0)<91 || char.charCodeAt(0)>96) && char.charCodeAt(0)!=161 && char.charCodeAt(0)!=191)){
		valid=true;
	}

	return valid;
}

function sizeRecort(size){
	return Number(size.substring(0, size.length-2));
}

function hasClass(nodo, clase){
	let exist=false;
	
	for(let i=0; i<nodo[0].classList.length; i++){
		if(clase==nodo[0].classList[i]){
			exist=true;
			break;
		}
	}

	return exist;
}

function extractOnlyText(text){
	text=text.replace(/(^ |^\-)/, '');
	text=text.replace(/\-\-/, '-');
	text=text.replace(/\- /, '-');
	text=text.replace(/ \-/, ' ');
	text=text.replace(/  /, ' ');
	return text.replace(/[^a-zñ\- áäàâéèêëíïîìóòôöúûùü]/gi, '');
}

function firstUpper(name){
	let complete='';

	for(let i=0;i<name.length;i++){
		if(i==0){
			complete=complete+name.charAt(i).toUpperCase();
		}else{
			complete=complete+name.charAt(i).toLowerCase();
		}
	}

	return complete;
}

function firstCharName(name){
	name=name.split(' ');

	for(let i=0;i<name.length;i++){
		name[i]=firstUpper(name[i]);
	}

	name=name.join(' ');

	return name;
}

function puntoDigito(number){

	number=extractNumberInText(String(number));

	if(number.length>0 && Number(number)==0){
		number='';
	}

	let numero='';
	for(let i=0;i<number.length;i++){
		if(number.charAt(i)!='.'){
			numero=numero+number.charAt(i);
		}
	}
	number=numero;

	let n=3;
	let x=0;
	if(number.length>n+x){
		if(number>999){
			number=number.split('');
			do{
				let j=n+x;
				let h=0;
				for(let i=0; i<=n+x; i++){
					let act=number.length-h;
					number[number.length-h]=number[act-1];
					h++;
				}
				x++;
				number[number.length-n-x]='.';
				n=n+3;
			}while(number.length>n+x);
			number=number.join('');
		}else{
			number=number;
		}
	}

	return number;
}



function getTimeNow(){
	let date=new Date();

	return date.getFullYear().toString()+date.getMonth().toString()+date.getDate().toString()+date.getHours()+date.getMinutes().toString()+date.getSeconds().toString()+date.getMilliseconds().toString()+date.getTime();
}

function existInJSON(arreglo, json){
	let valid=true, extra=[];
	for(let i=0; i<arreglo.length; i++){
		if((arreglo[i] in json)!=true){
			extra.push(arreglo[i]);
		}
	}
	if(extra.length>0){
		valid=false;
	}
	return {
		extra,
		valid
	}
}

function rifFormat(rif){
	let rifNumber=extractNumberInText(rif);
	rifNumber=rifNumber.substring(0, rifNumber.length-1);
	return rif.charAt(0).toUpperCase()+'-'+rifNumber+'-'+rif.charAt(rif.length-1);
}

// Validación: -----------------------------------------------------------------------------------------
function validateName(name, type, obligatory){
	let error=null;
	name=name.trim();

	if(name.length>0){
		if(name.length>50){
			error='¡El '+type+' no debe contener más de 50 caracteres!';
		}else if(name.length<2){
			error='¡El '+type+' no debe contener menos de 2 caracteres!';
		}else if(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]*( [a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]*)?$/gi.test(name)==false){
			error='¡El '+type+' debe contener solo caracteres alfabéticos!';
		}
	}else if(obligatory){
		error='¡Debe introducir el '+type+'!';
	}

	return error;
}

function validateDoubleName(name, type1, type2, obligatory){
	let error=null;
	name=name.trim();

	if(name.length>0){
		if(name.split(' ').length<2){
			error='¡Debe introducir tanto el '+type1+' como el '+type2+'!';
		}else if(name.length>101){
			error='¡El '+type1+' y el '+type2+' no deben contener más de 50 caracteres cada uno!';
		}else{
			let nombres=name.split(' ');
			for(let i=0; i<nombres.length; i++){
				if(nombres[i].length<2){
					error='¡Tanto el '+type1+' como el '+type2+' deben contener más de 2 caracteres!';
					break;
				}
			}

			if(error==null){
				if(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]* [a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]*$/gi.test(name)==false){
					error='¡El '+type1+' y el '+type2+' deben contener solo caracteres alfabéticos!';
				}
			}
		}
	}else if(obligatory){
		error='¡Debe introducir el '+type1+' y el '+type2+'!';
	}

	return error;
}

function validateCi(ci, minimo, maximo, obligatory){
	let error=null, min="", max="";
	ci=extractNumberInText(ci);

	if(minimo){
		if(minimo<=0){
			min=1;
		}else{
			min=minimo;
		}
	}else{
		min=1;
	}

	if(maximo){
		if(maximo<=0){
			max=1000;
		}else{
			max=maximo;
		}
	}else{
		max=1;
	}

	if(isNaN(ci)){
		error='¡El número de Cédula introducido no es un número!';
	}else if(ci.charAt(0).toString()=='0'){
		error='¡El primer dígito de la Cédula no debe ser "0"!';
	}else if(ci.length<min){
		error='¡La cédula de identidad debe contener, como mínimo, '+min+' caracteres numéricos!';
	}else if(ci.length>max){
		error='¡La cédula de identidad debe contener, como máximo, '+max+' caracteres numéricos!';
	}

	return error;
}

function validateEmail(email, obligatory){
	let error=null,
	regExp=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

	//regExp=/^[a-zA-Z][\w\._\-]{0,97}[a-zA-Z]@[a-zA-Z]([\w\._\-]{0,18}[a-zA-Z])?\.[a-zA-Z]\w{0,8}[a-zA-Z]$/i;

	email=email.trim();
	if(email.length>0){
		if(email.length>131){
			error='¡El correo electrónico debe contener menos de 132 caracteres!';
		}else if(regExp.test(email)==false){
			error='¡Formato de correo electrónico incorrecto!';
		}
	}else if(obligatory){
		error='¡Debe introducir un correo electrónico!';
	}

	return error;
}

function validatePhone(tlf, obligatory){
	let error=null, match=tlf.trim().match(/^(\+\d{2} ?)?0?[1-9]{3}[\- ]?\d{7}$/gi);

	if(tlf.length>0){
		if(match==null){
			error='¡Formato de número telefónico incorrecto!';
		}
	}else if(obligatory){
		error='¡Debe introducir un número telefónico!';
	}

	return error;
}

/*
	Función que obtiene, del número de cédula, número de verificación del rif: El formato introducido debe ser:
	v26916136. El rif debe contener 8 dígitos y la letra en el inicio, contando un total de 9 caracteres. En caso de
	que falten dígitos en para completar los 9 caracteres, se añade 0 por la cantidad de dígitos faltantes en el lado
	izquierdo.

	- Ejemplo 1:
		Cédula: 8251090;
		Cédula para Rif: v08251090

	- Ejemplo 2:
		Cédula: 825109;
		Cédula para Rif: v00825109

*/

/*function getRifVerificatorDigit(RIF){
	let SumRIF, NumRif = RIF, cadena = [], digit=0;

	if (NumRif.length == 9){
		for (i = 0; i < 9; i++){
			cadena[i] = NumRif.substr(i,1);
		}
		cadena[0] = 0;

		switch (NumRif.charAt(0).toUpperCase()){
			case "V":
				cadena[0] = 1;
				break;

			case "E":
				cadena[0] = 2;
				break;

			case "J":
				cadena[0] = 3;
				break;

			case "P":
				cadena[0] = 4;
				break;

			case "G":
				cadena[0] = 5;
				break;

			default:
				digit=null;
				break;
		};

		if(digit!=null){
			cadena[0] = cadena[0] * 4;
			cadena[1] = cadena[1] * 3;
			cadena[2] = cadena[2] * 2;
			cadena[3] = cadena[3] * 7;
			cadena[4] = cadena[4] * 6;
			cadena[5] = cadena[5] * 5;
			cadena[6] = cadena[6] * 4;
			cadena[7] = cadena[7] * 3;
			cadena[8] = cadena[8] * 2;

			SumRIF = cadena[0] + cadena[1] + cadena[2] + cadena[3] +
			cadena[4] + cadena[5] + cadena[6] + cadena[7] + cadena[8];

			let EntRIF = parseInt(SumRIF/11),
			Residuo = SumRIF - (EntRIF * 11);
			digit = 11 - Residuo;

			if (digit > 9){
				digit = 0;
			}
		}
	}else{
		digit=null;
	}

	return digit;
}*/

//
// Función JavaScript VerifRIF Versión 1, 18/Marzo/2002
// Recibe el Numero de RIF sin separadores y devuelve
// True si el RIF es correcto
//
function VerifRIF(RIF){
	let SumRIF, NumRif = RIF, cadena = [], error=null;

	if (NumRif.length == 10){
		for (i = 0; i < 10; i++){
			cadena[i] = NumRif.substr(i,1);
		}
		cadena[0] = 0;

		switch (NumRif.charAt(0).toUpperCase()){
			case "V":
				cadena[0] = 1;
				break;

			case "E":
				cadena[0] = 2;
				break;

			case "J":
				cadena[0] = 3;
				break;

			case "P":
				cadena[0] = 4;
				break;

			case "G":
				cadena[0] = 5;
				break;

			default:
				error='¡Letra de formato de código incorrecta!';
				break;
		};

		if(error==null){
			cadena[0] = cadena[0] * 4;
			cadena[1] = cadena[1] * 3;
			cadena[2] = cadena[2] * 2;
			cadena[3] = cadena[3] * 7;
			cadena[4] = cadena[4] * 6;
			cadena[5] = cadena[5] * 5;
			cadena[6] = cadena[6] * 4;
			cadena[7] = cadena[7] * 3;
			cadena[8] = cadena[8] * 2;

			SumRIF = cadena[0] + cadena[1] + cadena[2] + cadena[3] +
			cadena[4] + cadena[5] + cadena[6] + cadena[7] + cadena[8];

			EntRIF = parseInt(SumRIF/11);
			Residuo = SumRIF - (EntRIF * 11);
			DigiVal = 11 - Residuo;

			if (DigiVal > 9){
				DigiVal = 0;
			}

			if (DigiVal != cadena[9]){
				error='¡Rif incorrecto!';
			}
		}
	}else{
		error='¡Rif incorrecto!';
	}

	return error;
}

function validateRif(rif, obligatory){
	let error=null, test=/[vepgj]\d{9}/gi, rifNumer=0, rifChars='';
	rif=rif.replace(/[^0-9vepgj]/gi, '').toUpperCase().trim();
	rifNumer=extractNumberInText(rif);
	rifChars=extractOnlyText(rif);

	if(rif.length>0){
		if(rifChars.length<1){
			error='¡El rif carece de la letra de formato de código!';
		}else if(rifChars.length>1){
			error='¡El rif solo debe contener una letra de formato de código!';
		}else if(!isNaN(rif.charAt(0))){
			error='¡La letra de formato de código del Rif debe definirse en el inicio!';
		}else if(rifNumer.length!=9){
			error='¡El Rif debe contener 9 dígitos!';
		}

		if(error==null && test.test(rif)==false){
			error='¡El formato del Rif introducido es incorrecto!';
		}else if(error==null){
			error=VerifRIF(rif);
		}
	}else if(obligatory){
		error='¡Debe introducir un Rif!';
	}

	return error;
}

function validateSimpleText(text, type, max, obligatory, The){
	let error=null, the='El';
	text=text.trim();

	if(The){
		the='La';
	}

	if(text.length>0){
		if(text.length<5){
			error='¡'+the+' '+type+' debe contener, como mínimo, 5 caracteres!';
		}else if(text.length>max){
			error='¡'+the+' '+type+' no debe contener más de '+max+' caracteres!';
		}
	}else if(obligatory){
		error='¡Debe introducir un '+type+'!';
	}

	return error;
}

function validateMoney(money, denomination, obligatory){
	let error=null;
	money=money.replace(eval("/(\\"+denomination+"|\\.)/gi"), '');
	money=money.replace(/\,/gi, '.');

	if(money.length>0){
		if(isNaN(money)){
			error='¡El monto introducido tiene un formato de dinero incorrecto!';
		}else if(Number(money)<=0){
			error='¡El monto introducido no puede ser igual o menor a 0!';
		}
	}else if(obligatory){
		error='¡Debe introducir un monto de dinero!';
	}

	return error;
}

function validateSelectList(value, values){
	let error=null;
	value=value.trim();

	if(value.length<1){
		error='¡Debe seleccionar un elemento de la lista!';
	}else if(values){
		let valid=false;
		for(let i=0; i<values.length; i++){
			if(value==values[i]){
				valid=true;
				break;
			}
		}
		if(valid==false){
			error='¡El elemento seleccionado de la lista no es un valor válido!';
		}
	}

	return error;
}

function validateFile(file, minSize, maxSize, accepted){
	let error=null;

	if(accepted && ((typeof accepted)=='object' || (typeof accepted)=='array')){
		let valid=false, types='';
		for(let i=0; i<accepted.length; i++){
			let regExp=eval('/\\/'+accepted[i]+'/gi');
			if(regExp.test(file.type)){
				valid=true;
			}
			types=types+', "'+accepted[i]+'"';
		}

		if(valid==false){
			error='¡El tipo de archivo debe ser'+types.slice(1).trim()+'!';
		}
	}

	if((error==null && minSize!=null) && minSize>file.size){
		error='¡El archivo debe tener un peso mínimo de '+minSize+' Bytes!';
	}

	if((error==null && maxSize) && maxSize<file.size){
		error='¡El archivo debe tener un peso máximo de '+maxSize+' Bytes!';
	}

	return error;
}

function verifiqueFileContent(content, params, errorContent){
	let contentId=getId(content).id, fileName=$('#'+contentId+' label .input-file-name'),
	input=$('#'+contentId+' input[type="file"]'), error=null, countError=0;

	errorContent=extractNode(errorContent);

	if(!('minSize' in params)){
		params.minSize=null;
	}
	if(!('maxSize' in params)){
		params.maxSize=null;
	}
	if(!('accepted' in params)){
		params.accepted=null;
	}

	if(input[0].files.length<1){
		fileName.html('Seleccione un archivo');
	}else if(input[0].files.length>1){
		fileName.html('Múltiples archivos seleccionados'+' ('+input[0].files.length+')');
	}else{
		fileName.html('Archivo seleccionado: '+input[0].files[0].name);
	}

	if(input[0].files.length>0){
		if(input[0].files.length>1){
			let contenido='';
			for(let i=0; i<input[0].files.length; i++){
				let texto=null;
				texto= validateFile(input[0].files[i], params.minSize, params.maxSize, params.accepted);	
				if(texto!=null){
					countError++;
					contenido=contenido+'<p class="error">'+(i+1)+' - '+texto+'<p>';
				}else{
					contenido=contenido+'<p>'+(i+1)+' - '+input[0].files[i].name+'<p>';
				}
			}

			error=contenido;
		}else{
			error= validateFile(input[0].files[0], params.minSize, params.maxSize, params.accepted);
			if(error==null){
				error='';
			}else{
				countError++;
				error='<p class="error">'+error+'<p>';
			}
		}
	}

	errorContent.innerHTML=error;

	return countError;
}

/*async function validateDimentionsImage(img, validator, funcion){
	let image=new Image();

	image.onload= async ()=>{
		validator();
		funcion();
	}

	image.src= await URL.createObjectURL(img);
}*/

// Cliente: --------------------------------------------------------------------------------------------
function getLabel(input){
	let inputName=input.attr('id');
	if(inputName.length<1){
		inputName=input.attr('name');
		input.attr('id')=inputName;
	}

	if(inputName.length<1){
		let i=0;
		inputName='float_label_'+getTimeNow();

		if($('#'+inputName).length>0){
			let exist=true;
			do{
				if($('#'+inputName+i).length>0){
					i++;
				}else{
					exist=false;
					inputName=inputName+i;
				}
			}while(exist==true);
		}
	}

	if(input[0].nextElementSibling.htmlFor!=inputName){
		input[0].nextElementSibling.htmlFor=inputName;
	}

	return $('label[for="'+inputName+'"]');
}

function initFloatLabel(input){
	let label=getLabel(input);
	if(input.val().trim().length>0){
		label.removeClass('inactive');
		label.addClass('active');
	}else{
		label.removeClass('active');
		label.addClass('inactive');
	}
}

function floatLabel(input){
	input.attr('placeholder', '');

	initFloatLabel(input);

	input.keyup(()=>{
		initFloatLabel(input);
	});
}

function addClass(nodo, clase){
	if(hasClass(nodo, clase)==false){
		nodo.addClass(clase);
	}
}

function removeClass(nodo, clase){
	if(hasClass(nodo, clase)){
		nodo.removeClass(clase);
	}
}

function extractNode(node){
	if(!('id' in node)){
		node=node[0];
	}

	return node;
}

function asignId(text){
	let id=text+getTimeNow(), count=0, exist=true;
	if($('#'+id).length>0){
		do{
			if($('#'+id+count).length>0){
				count++;
			}else{
				id=id+count;
				exist=false;
			}
		}while(exist==true);
	}

	return id;
}

function getId(element, text){
	element=extractNode(element);

	if(element.id==''){
		element.id=asignId(text);
	}

	return element;
}

function addId(element, text){
	if(existInJSON(['id'], element).valid==false){
		element=element[0];
	}

	let id=element.id;
	if(id==''){
		id=asignId(text);
		element.id=id;
	}
}

function removeFloatLabelError(input){
	let parent=input[0].parentNode;

	if(parent.id==''){
		parent.id=asignId('_float_label');
	}

	input.keydown(()=>{
		if(hasClass($('#'+parent.id), 'float-label-error')){
			$('#'+parent.id).removeClass('float-label-error');
		}
	}).keyup(()=>{
		if(input.val()==''){
			$('#'+parent.id+' .error').html('');
		}
	});
}

function createNotification(title, message, type, image){	
	let date=new Date(), id=asignId('notification');
	let img='', over=false, plantilla='',
	deleted=()=>{
		$('#'+id).slideUp(500);
		setTimeout(()=>{
			$('#'+id).remove();
		}, 500);
	},
	difumed=()=>{
		difumedError=setTimeout(()=>{
			deleted();
		}, 10000);
	};
	type=type.toLowerCase();

	if(image){
		img=image;
	}else if(type=='fail'){
		img='/IMG/iconos/fail.svg';
	}else{
		img='/IMG/iconos/success.svg';
	}

	plantilla=`
		<figure id="`+id+`" class="notificacion bettwenFlex `+type+`">
			<img src="`+img+`">
			<figcaption>
				<h1>
					`+title+`
				</h1>
				<div class="text">
					`+message+`
				</div>
			</figcaption>

			<button type="button" class="close" title="Cerrar">
				<i class="fa fa-times"></i>
			</button>
		</figure>
	`;

	$('#notification-section').append(plantilla);

	$('#'+id).css('display', 'flex').slideDown(250);
	$('#'+id).css({
		'opacity': '1',
		'transform': 'none',
		'transition': '500ms'
	});

	difumed();

	$('#'+id).mouseover(()=>{
		clearInterval(difumedError);
	});

	$('#'+id).mouseout(()=>{
		difumed();
	});

	$('#'+id+' .close').click(()=>{
		deleted();
	});
}

// Formateo de campos de texto: --------------------------------------------------------------------------------------------
// Función de formateo de texto de JavaScript nativo en presión de tecla:
function typeSingleFormatPreventedJS(input, formato){
	input.addEventListener('keydown', (e)=>{
		if(e.key.length==1){
			e.preventDefault();
			e.target.value=formato(e.target.value+e.key);
		}
	});
}

// Función de formateo de texto de JQuery en presión de tecla:
function typeSingleFormatPreventedJQ(input, formato){
	input.keydown((e)=>{
		if(e.originalEvent.key.length==1){
			e.preventDefault();
			e.target.value=formato(e.target.value+e.originalEvent.key);
		}
	});
}

function typeSingleFormatJS(input, formato){
	let formateo=()=>input.value=formato(input.value);
	input.addEventListener('keyup', formateo);
	input.addEventListener('keypress', formateo);
}

function typeSingleFormatJQ(input, formato){
	let formateo=()=>input.val(formato(input.val()));
	input.keyup((e)=>{
		formateo();
	}).keypress(()=>{
		formateo();
	});
}

function firstCharName_onlyText(string){
	return firstCharName(extractOnlyText(string));
}

function onlyName(string){
	return firstCharName_onlyText(string.replace(/ /gi, ''));
}

function messageFormat(string){
	string=string.replace(/^ /, '');
	return string.slice(0,1).toUpperCase()+string.slice(1);
}

function searchFormat(string){
	string=string.replace(/  /gi, ' ');
	string=string.replace(/^[^a-zñ\- áäàâéèêëíïîìóòôöúûùü\¿]/gi, '');
	return string.replace(/^ /, '');
}

function upperCase(string){
	return string.toUpperCase();
}

function lowerCase(string){
	return string.toLowerCase();
}

function emailFormat(string){
	string=string.toLowerCase();
	string=string.replace(/^[^a-z]/gi, '');
	return string.replace(/ /g, '');
}

function moneyFormat(money, denomination){
	money=extractNumberInText(money);
	if(money.length>2){
		let add=puntoDigito(money.slice(0,money.length-2));
		if(add>0){
			add=add+',';
		}
		money=add+money.slice(money.length-2);
	}

	if(money.length>0){
		money=denomination+money;
	}

	return money;
}

function dollarFormat(money){
	return moneyFormat(money, '$');
}

module.exports= {
	extractNumberInText,
	extractOnlyText,
	sanitizeString,
	destilde,
	HTMLSpecialsChars,
	isLetter,
	getTimeNow,
	firstUpper,
	firstCharName,
	puntoDigito,
	existInJSON,
	rifFormat,
	validateName,
	validateCi,
	VerifRIF,
	validateRif,
	validateDoubleName,
	validateEmail,
	validatePhone,
	validateSimpleText,
	validateMoney
};