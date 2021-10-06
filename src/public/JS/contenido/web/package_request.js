// Función que añade errores a los campos de texto del formulario de solicitud de plan:
function addErrorsOfMailVars(errores, addErrors){
	if(errores.name){
		addErrors($('#name'), errores.name);
	}
	if(errores.middle_name){
		addErrors($('#middle-name'), errores.middle_name);
	}
	if(errores.doc){
		addErrors($('#doc'), errores.doc);
	}
	if(errores.email){
		addErrors($('#email'), errores.email);
	}
	if(errores.tlf){
		addErrors($('#tlf'), errores.tlf);
	}
	if(errores.address){
		addErrors($('#address'), errores.address);
	}
	if(errores.message){
		addErrors($('#message'), errores.message);
	}
	if(errores.package){
		createNotification(errores.package, errores.package, 'fail');
	}
}

$('#solicite-plan-form').ready(()=>{

	let habiliteBtn=()=>{
		$('#solicite-plan-form button[type="submit"]').css('cursor', 'pointer').removeAttr('disabled').attr('title', 'Enviar');
	};

	floatLabel($('#name'));
	floatLabel($('#middle-name'));
	floatLabel($('#doc'));
	floatLabel($('#email'));
	floatLabel($('#tlf'));
	floatLabel($('#address'));
	floatLabel($('#message'));

	typeSingleFormatJQ($('#name'), onlyName);
	typeSingleFormatJQ($('#middle-name'), onlyName);
	typeSingleFormatJQ($('#doc'), (string)=>{
		return string.replace(/[^a-zñáäàâéèêëíïîìóòôöúûùü0-9]/gi, '').toUpperCase();
	});
	typeSingleFormatJQ($('#email'), emailFormat);
	typeSingleFormatJQ($('#tlf'), extractNumberInTextAndSeparattor);
	typeSingleFormatJQ($('#address'), messageFormat);
	typeSingleFormatJQ($('#message'), messageFormat);

	removeFloatLabelError($('#name'));
	removeFloatLabelError($('#middle-name'));
	removeFloatLabelError($('#doc'));
	removeFloatLabelError($('#email'));
	removeFloatLabelError($('#tlf'));
	removeFloatLabelError($('#address'));
	removeFloatLabelError($('#message'));

	$('#solicite-plan-form').submit((e)=>{
		e.preventDefault();
		let valid=true, formProccess=false;

		$('#solicite-plan-form button[type="submit"]').css('cursor', 'no-drop').attr('disabled', '').attr('title', '¡Espere mientras el formulario se envía!');

		$('#solicite-plan-form .float-label').removeClass('float-label-error');
		$('#solicite-plan-form .float-label p').html('');

		let errores={}, name=$('#name').val().trim(), middle_name=$('#middle-name').val().trim(), typeDoc=$('#type-doc').val().trim(),
		doc=$('#doc').val().trim(), email=$('#email').val().trim(), tlf=$('#tlf').val().trim(),
		message=$('#message').val().trim(), address=$('#address').val().trim(), firstError=null,
		addErrors=(input, error)=>{
			if(error){
				if(firstError==null){
					firstError=input;
				}
				input[0].parentNode.className=input[0].parentNode.className+' float-label-error';
				input[0].nextElementSibling.nextElementSibling.nextElementSibling.innerHTML=error;
				valid=false;
			}
		}, focusError=()=>{
			if(firstError){
				firstError.focus();
				firstError=null;
			}
		};

		addErrors($('#name'), validateName(name, 'nombre', true));
		addErrors($('#middle-name'), validateName(middle_name, 'apellido'));

		if(typeDoc.toUpperCase()=='VC' || typeDoc.toUpperCase()=='EC'){
			addErrors($('#doc'), validateCi(doc, 1, 9, true));
		}else{
			addErrors($('#doc'), validateRif(typeDoc.charAt(0)+doc, true));
		}

		addErrors($('#email'), validateEmail(email, true));
		addErrors($('#tlf'), validatePhone(tlf), true);
		addErrors($('#address'), validateSimpleText(address, 'mensaje', 200, true));
		addErrors($('#message'), validateSimpleText(message, 'mensaje', 1500));
		focusError();

		if(valid==true && formProccess==false){
			formProccess=true;
			let data= new FormData();

			$('#solicite-plan-form button[type="submit"]').css('cursor', 'no-drop').attr('disabled', '').attr('title', '¡Espere mientras el formulario se envía!');
			$('.solicite-plan-section .second-loader').fadeIn(250);

			data.append('name', sanitizeString(name));
			data.append('middle_name', sanitizeString(middle_name));
			data.append('doc', sanitizeString(typeDoc.toUpperCase()+'-'+doc));
			data.append('email', sanitizeString(email));
			data.append('tlf', sanitizeString(tlf));
			data.append('address', sanitizeString(address));
			data.append('message', sanitizeString(message));
			data.append('package', sanitizeString($('#package-send').val()));
			
			$.ajax({
				url: '/mail/solicite-plan/',
				type:'post',
				dataType:'json',
				data:data,
				cache:false,
				contentType:false,
				processData:false,
				timeout: 30000
			}).fail((reason)=>{
				formProccess=false;
				habiliteBtn();
				$('.solicite-plan-section .second-loader').fadeOut(250);
				createNotification('¡Error de conexión!', 'El envío del formulario de contacto no se ha realizado porque no se pudo establecer conexión con el servidor.', 'fail');
			}).then((response)=>{
				formProccess=false;
				habiliteBtn();
				$('.solicite-plan-section .second-loader').fadeOut(250);

				if('success' in response){
					$('#solicite-plan-form')[0].reset();
					createNotification('¡Envío realizado!', 'Se ha enviado el formulario de contacto correctamente.', 'success', '/IMG/iconos/sent-mail.svg');

					if(response.envioCliente){
						createNotification('¡Hemos enviado una respuesta!', 'Se ha enviado una respuesta al correo electónico que introdujo.', 'success', '/IMG/iconos/sent-mail.svg');
					}

					initFloatLabel($('#name'));
					initFloatLabel($('#middle-name'));
					initFloatLabel($('#email'));
					initFloatLabel($('#tlf'));
					initFloatLabel($('#address'));
					initFloatLabel($('#message'));
				}else if(response.errno){
					if(response.errno=='NOT EXIST VALUES' || response.errno=='ERROR IN VALUES'){
						addErrorsOfMailVars(response.errores, addErrors);
						if(response.errno=='NOT EXIST VALUES'){
							createNotification('¡Datos faltantes!', 'Se ha enviado el formulario con valores incompletos. Por favor, evite manipular el método de envío del formulario.', 'fail');
						}
						focusError();
					}else{
						createNotification('¡Error de envío!', 'Se ha producido un error al enviar el formulario. Por favor, inténtelo más tarde.', 'fail');
					}
				}
			});
		}else{
			habiliteBtn();
		}
	});
})