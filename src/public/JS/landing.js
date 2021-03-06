var window_width=window.innerWidth;

function windowScroll(portadaHeight){
	let navHeight=sizeRecort($('#nav').css('height')), nav=$('#nav'), img=$('#nav img');

	/*if(navHeight>=(portadaHeight-window.scrollY)){
		if(hasClass(nav, 'dark-nav')==false){
			nav.addClass('dark-nav');
		}

		if(img.css('opacity')=='0'){
			img.animate({
				opacity: 1
			},250);
		}
	}else{
		if(hasClass(nav, 'dark-nav')){
			nav.removeClass('dark-nav');

			img.animate({
				opacity: 0
			},500);
		}
	}*/
}

function showMore(section, childs, button, more){
	let id=section[0].id, max=0, length=0, result=null, show=(item)=>{
		if(item.css('display')=='none'){
			item.show();
		}
	},
	hide=(item)=>{
		if(item.css('display')!='none'){
			item.hide();
		}
	};

	if(id==''){
		id=asignId('section_more');
		section[0].id=id;
	}

	length=$('#'+id+' '+childs).length;

	if(window.innerWidth>1000){
		max=8;
	}else if(window.innerWidth>600){
		max=6;
	}else if(window.innerWidth>400){
		max=4;
	}else{
		max=2;
	}

	if(length>max){
		result=max+1;
		for(let i=0; i<=length; i++){
			let item=$('#'+id+' '+childs+':nth-child('+i+')');

			if(i<result){
				show(item);
			}else{
				if(more==true){
					show(item);
				}else{
					hide(item);
				}
			}
		}

		if(button.css('display')=='none'){
			button.show();
		}
	}else{
		for(let i=1; i<=length; i++){
			let child=$('#'+id+' '+childs+':nth-child('+i+')');
			if(child.css('display')=='none'){
				child.show();
			}
		}

		if(button.css('display')!='none'){
			button.hide();
		}
	}

	return result;
}

$('#header').ready(()=>{
	let portadaHeight=sizeRecort($('#header').css('height'));

	windowScroll(portadaHeight);
	//windowScroll(portadaHeight);
	$(window).scroll(()=>{
		windowScroll(portadaHeight);
		//windowScroll(portadaHeight);
	}).resize(()=>{
		windowScroll(portadaHeight);
	});
});

$('#categories').ready(()=>{
	//height_long_card2($('#categories .height-long-card-content'));
	let categoriesCarrusel=new Height_long_card($('#categories .height-long-card-content'));
	categoriesCarrusel.start();

	/*setTimeout(()=>{
		//categoriesCarrusel.add('DESARROLLO DE SOFTWARE 7', 'DESARROLLO DE APLICACIONES WEB', '/IMG/Web-developer.jpg', '');
		//categoriesCarrusel.edit('prueba-long', 'NUEVO DESARROLLO', 'DESARROLLO DE APLICACIONES M??VILES', '/IMG/Web-developer1.jpg', '');
	}, 5000);*/
});

$('#contacto').ready(()=>{
	floatLabel($('#nombre'));
	floatLabel($('#email'));
	floatLabel($('#telefono'));
	floatLabel($('#mensaje'));
	/*for(let i=1; i<=$('#contact-form .float-label').length; i++){
		floatLabel($('#contact-form .float-label:nth-child('+i+') input'));
		floatLabel($('#contact-form .float-label:nth-child('+i+') textarea'));
	}*/
});

/*$('#servicios .carrusel').ready(()=>{
	let screen=$('#servicios .carrusel .screen'), nav=$('#servicios .carrusel .nav'), contenido=$('#servicios .carrusel .screen .contenido');
	let itemsLength=$('#servicios .carrusel .screen .contenido .item').length, selected=0, countSelected=0, interval=null,
	next=(item, i)=>{
		let button=$('#servicios .carrusel .nav div button:nth-child('+i+')');

		$('#servicios .carrusel .nav div button').css('background', 'none');
		button.css('background', 'white');
		screen.css({
			'background-image':item.attr('image'),
			'transition':"background 500ms"
		});
		nav.css({
			'background':item.attr('color'),
			'transition':'250ms'
		});
		contenido.css({
			'box-shadow':'.05em 0 .1em '+item.attr('color'),
			'opacity': '.9',
			'background': item.attr('color'),
			'transition':'250'
		});
		selected.fadeOut(250);
		selected=item;
		countSelected=i;

		setTimeout(()=>{
			item.fadeIn(250);
		}, 250);
	}, startInterval=()=>{
		if($('#servicios .carrusel .screen .contenido .item').length>1){
			interval=setInterval(()=>{
				let count=0;
				if(countSelected<itemsLength){
					count=countSelected+1;
				}else{
					count=1;
				}

				next($('#servicios .carrusel .screen .contenido .item:nth-child('+count+')'), count);
			}, 5000);
		}
	};

	for(let i=1; i<=itemsLength; i++){
		$('#servicios .carrusel .nav div').append('<button contenido="'+i+'"></button>');
		let button=$('#servicios .carrusel .nav div button:nth-child('+i+')'),
		item=$('#servicios .carrusel .screen .contenido .item:nth-child('+i+')');

		if(i==1){
			selected=$('#servicios .carrusel .screen .contenido .item:nth-child('+i+')');
			countSelected=1;
			screen.css('background-image', selected.attr('image'));
			$('#servicios .carrusel .nav div button:nth-child('+i+')').css('background', 'white');
		}

		button.mouseover(()=>{
			if(item!=selected && countSelected!=i){
				button.css('background', 'rgb(255,255,255,0.25)');
			}
		}).mouseout(()=>{
			if(item!=selected && countSelected!=i){
				button.css('background', 'none');
			}
		});

		button.focus(()=>{
			clearInterval(interval);
			if(item!=selected && countSelected!=i){
				next(item, i);
			}
		}).blur(()=>{
			startInterval();
		});
	}

	startInterval();
});*/

$('#planes').ready(()=>{
	let more=false, planes=$('#planes .plan').length, max=null, button=$('#more-planes');

	max=showMore($('#planes'), '.plan', button, more);

	$(window).resize(()=>{
		max=showMore($('#planes'), '.plan', button, more);
	});

	button.click(()=>{
		if(max!=null){
			if(more==false){
				for(let i=max; i<=planes; i++){
					$('#planes .plan:nth-child('+i+')').show();
				}
				more=true;
				button.html('Ver menos');
			}else{
				for(let i=planes; i>=max; i--){
					$('#planes .plan:nth-child('+i+')').hide();
				}
				more=false;
				button.html('Ver m??s');
				$('html').animate({
					scrollTop: $('#planes').offset().top
				}, 0);
			}
		}
	});
});

$('#trabajos').ready(()=>{
	let descriptionContent=$('#trabajos .media-player .description');
	//let work_galery=new MediaReproductor('#trabajos .media-player .galery .screen', '#trabajos .media-player .galery .footer .media-items', '#trabajos .media-player .galery .footer .prev', '#trabajos .media-player .galery .footer .next', '#trabajos .media-player .galery .second-loader');
	//work_galery.start();

	/*setTimeout(()=>{
		work_galery.add({
			type:'IMG',
			src:'/IMG/web-3.png',
			title:'Ejemplo de prueba'
		});
		work_galery.delete($('#ejemplomedia'));
	}, 5000);*/

	let trabajos= new GetProyect($('#trabajos .media-player .description .box'), {
		screenQuery: '#trabajos .media-player .galery .screen',
		mediaSelectorQuery: '#trabajos .media-player .galery .footer .media-items',
		prevButton: '#trabajos .media-player .galery .footer .prev',
		nextButton: '#trabajos .media-player .galery .footer .next',
		loader: '#trabajos .media-player .galery .second-loader'
	}, $('#trabajos .media-player .proyect-loader'), '/works/client/');

	$('#trabajos .media-player .galery .open').click(()=>{
		let display=descriptionContent.css('display');
		if(window.innerWidth<=760){
			descriptionContent.fadeIn(500);
		}
	});

	$('#trabajos .media-player .description .close').click(()=>{
		let display=descriptionContent.css('display');
		if(window.innerWidth<=760){
			descriptionContent.fadeOut(500);
		}
	});

	$(window).resize(()=>{
		if(window.innerWidth<=760){
			if(descriptionContent.css('display')!='none'){
				descriptionContent.fadeOut(500);
			}
		}else if(descriptionContent.css('display')=='none'){
			descriptionContent.fadeIn(500);
		}
	});

	setTimeout(()=>{
		/*trabajos.proyectPlayer.reset(`
			<video src="/VIDEO/ejemplo.mp4" class="media" media-name='T??tulo de im??gen de prueba' controls></video>
			<video src="/VIDEO/ejemplo.mp4" poster="/IMG/antena.png" class="media" media-name='T??tulo de im??gen de prueba' controls></video>
			<img src="/IMG/web-3.png" class="media" media-name='T??tulo de Zapatos'/>
			<img src="/IMG/antena.png" id="ejemplomedia" class="media" media-name='T??tulo de im??gen de prueba'/>
			<img src="/IMG/grey-antenna.jpg" class="media" media-name='T??tulo de Zapatos'/>
		`, 'error');*/
	}, 10000);
});

$('#contacto').ready(()=>{
	let valid=true, contactProccess=false,
	habiliteBtn=()=>{
		$('#contact-form button[type="submit"]').css('cursor', 'pointer').removeAttr('disabled').attr('title', 'Enviar');
	};

	/* Formateo de contenido de inputs o textarea: --------------------------------------------------------------------
		La funci??n "extractNumberInText" puede ser cambiada por cualquier otra funci??n que formatee el texto.

	// Funci??n de JavaScript Nativo:
	$('#nombre')[0].addEventListener('keydown', (e)=>{
		if(e.key.length==1){
			e.preventDefault();
			e.target.value=extractNumberInText(e.target.value+e.key);
		}
	});


	// Funci??n de JQuery:
	$('#nombre').keypress((e)=>{
		if(e.originalEvent.key.length==1){
			e.preventDefault();
			e.target.value=extractNumberInText(e.target.value+e.key);
		}
	});*/
	typeSingleFormatJQ($('#nombre'), ['firstCharName_onlyText']);
	typeSingleFormatJQ($('#email'), emailFormat);
	typeSingleFormatJQ($('#telefono'), extractNumberInTextAndSeparattor);
	typeSingleFormatJQ($('#mensaje'), messageFormat);

	removeFloatLabelError($('#nombre'));
	removeFloatLabelError($('#email'));
	removeFloatLabelError($('#telefono'));
	removeFloatLabelError($('#mensaje'));

	$('#contact-form').submit((e)=>{
		e.preventDefault();
		valid=true;
		$('#contact-form .float-label').removeClass('float-label-error');
		$('#contact-form .float-label p').html('');

		let errores={}, nombres=$('#nombre').val().trim(), email=$('#email').val().trim(), tlf=$('#telefono').val().trim(),
		message=$('#mensaje').val().trim(), firstError=null,
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

		addErrors($('#nombre') ,validateDoubleName(nombres, 'nombre', 'apellido', true));
		addErrors($('#email') ,validateEmail(email, true));
		addErrors($('#telefono') ,validatePhone(tlf));
		addErrors($('#mensaje'), validateSimpleText(message, 'mensaje', 1500, true));
		focusError();
		
		if(valid==true && contactProccess==false){
			contactProccess=true;
			let data= new FormData();

			$('#contact-form button[type="submit"]').css('cursor', 'no-drop').attr('disabled', '').attr('title', '??Espere mientras el formulario se env??a!');
			$('#contacto .second-loader').fadeIn(250);

			data.append('names', sanitizeString(nombres));
			data.append('email', sanitizeString(email));
			data.append('tlf', sanitizeString(tlf));
			data.append('message', sanitizeString(message));

			$.ajax({
				url: '/contacto/',
				type:'post',
				dataType:'json',
				data:data,
				cache:false,
				contentType:false,
				processData:false,
				timeout: 30000
			}).fail((reason)=>{
				contactProccess=false;
				habiliteBtn();
				$('#contacto .second-loader').fadeOut(250);
				createNotification('??Error de conexi??n!', 'El env??o del formulario de contacto no se ha realizado porque no se pudo establecer conexi??n con el servidor.', 'fail');
			}).then((response)=>{
				contactProccess=false;
				habiliteBtn();
				$('#contacto .second-loader').fadeOut(250);

				if('success' in response){
					$('#contact-form input[type="text"], #contact-form input[type="email"], #contact-form input[type="tlf"], #contact-form input[type="number"], #contact-form textarea').val('');
					createNotification('??Env??o realizado!', 'Se ha enviado el formulario de contacto correctamente.', 'success', '/IMG/iconos/sent-mail.svg');
				}else if(response.errno){
					switch (response.errno){
						case 'NOT EXIST VALUES':
							if(response.errores.names){
								addErrors($('#nombre'), response.errores.names);
							}
							if(response.errores.email){
								addErrors($('#email'), response.errores.email);
							}
							if(response.errores.tlf){
								addErrors($('#telefono'), response.errores.tlf);
							}
							if(response.errores.message){
								addErrors($('#message'), response.errores.message);
							}
							createNotification('??Datos faltantes!', 'Se ha enviado el formulario con valores incompletos. Por favor, evite manipular el m??todo de env??o del formulario.', 'fail');
							break;

						case 'ERROR IN VALUES':
							if(response.errores.names){
								addErrors($('#nombre'), response.errores.names);
							}
							if(response.errores.email){
								addErrors($('#email'), response.errores.email);
							}
							if(response.errores.tlf){
								addErrors($('#telefono'), response.errores.tlf);
							}
							if(response.errores.message){
								addErrors($('#mensaje'), response.errores.message);
							}
							break;

						default:
							createNotification('??Error de env??o!', 'Se ha producido un error al enviar el formulario. Por favor, int??ntelo m??s tarde.', 'fail');
							break;
					}

					focusError();
				}
			});
		}
	});
});

$(document).ready(()=>{

	// Preloader:
	$('#general-loader').fadeOut(500);
});