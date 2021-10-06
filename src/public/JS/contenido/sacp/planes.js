class ProcessForm{
	constructor(loader, button){
		this.loader=loader;
		this.button=button;
		this.val=false;
	}

	active(){
		this.val=true;
		this.loader.show();
		this.button.css('cursor', 'no-drop').attr('disabled', '').attr('title', '¡Espere mientras finaliza el proceso en ejecución!');
	}

	disable(){
		this.val=false;
		this.loader.hide();
		this.button.css('cursor', 'pointer').removeAttr('disabled').attr('title', 'Enviar');
	}
}

// Variables globales:
var processForm=null;

class Caracteristicas{
	constructor(content, button){
		this.content=getId(content, 'element_of_list_content');
		this.contentId=this.content.id;
		this.content=$('#'+this.contentId);
		this.addButton=button;

		this.addButton.click(()=>{
			this.addItem();
		});

		this.countElements=$('#'+this.contentId+' .caracteristica').length;

		for(let i=1; i<=this.countElements; i++){
			let item=getId($('#'+this.contentId+' .caracteristica:nth-child('+i+')'), 'caracteristica_item');
			item=$('#'+item.id);
			$('#'+this.contentId+' .caracteristica:nth-child('+i+') span b').html(i);

			$('#'+this.contentId+' .caracteristica:nth-child('+i+') .btn').click(()=>{
				this.deleteItem(item);
			});
		}
	}

	asignNumber(){
		for(let i=1; i<=this.countElements; i++){
			$('#'+this.contentId+' .caracteristica:nth-child('+i+') span b').html(i);
		}
	}

	deleteItem(item){
		item.remove();
		this.countElements--;

		this.asignNumber();
	}

	addItem(){
		this.content.append(`<div class="col-lg-6 mb-3 caracteristica">
			<label for="price" class="form-label"><b>Característica</b></label>
			<div class="input-group">
				<span class="input-group-text">
					<b>1</b>
				</span>
				<input type="text" class="form-control" placeholder="Característica">
				<button type="button" class="btn centerFlex" title="Eliminar Plan">
					<i class="fa fa-times"></i>
				</button>
			</div>
			<p class="error"></p>
		</div>`);

		this.countElements++;
		let item=getId($('#'+this.contentId+' .caracteristica:nth-child('+this.countElements+')'), 'caracteristica_item');
		item=$('#'+item.id);

		$('#'+this.contentId+' .caracteristica:nth-child('+this.countElements+') span b').html(this.countElements);
		$('#'+this.contentId+' .caracteristica:nth-child('+this.countElements+') .btn').click(()=>{
			this.deleteItem(item);
		});
	}
}

function veryfyVarServerError(json, attr, errorNode){
	let err=eval('json.'+attr);
	if(err){
		extractNode(errorNode).innerHTML=err;
	}
}

function hideElement(fal, tru, required){
	tru.addClass('hide');
	if(required){
		tru.removeAttr('required');
		fal.attr('required', '');
	}
	fal.removeClass('hide');
}function changeContentWithCkeck(check, contentFalse, contentTrue, required){
	if(check[0].checked){
		hideElement(contentFalse, contentTrue, required);
	}else{
		hideElement(contentTrue, contentFalse, required);
	}
}function checkType(check, contentFalse, contentTrue, required){
	changeContentWithCkeck(check, contentFalse, contentTrue, required);

	check.change(()=>{
		changeContentWithCkeck(check, contentFalse, contentTrue, required);
	});
}

function closeForm(cb){
	$('#data-section').slideDown(500);
	$('#form-section').slideUp(500);

	if(cb){
		cb();
	}

	setTimeout(()=>{
		$('#proccess-form')[0].reset();
	}, 500);
}

async function submitPlan(e){
	e.preventDefault();

	if(processForm.val==false){
		processForm.active();
		let valid=true, formProccess=false, firstError=null;

		let type_category=$('#registred_type')[0].checked, category=$('#category').val().replace(/\-/g, ''),
		name=$('#name').val(), price=$('#price').val(), img=$('#img')[0].files[0], new_category=$('#new_category').val(),
		description=$('#description').val().trim(), caracteristicas=[],	addError=(errorContent, error)=>{
			if(error!=null){
				valid=false;
			}else{
				error='';
			}
			extractNode(errorContent).innerHTML=error;
		};

		if(type_category==true){
			addError($('#category-error'), validateSimpleText(new_category.trim(), 'tipo de plan', 30, true));
		}else{
			addError($('#category-error'), validateSelectList(category));
		}

		addError($('#name-error'), validateSimpleText(name, 'nombre', 30, true));
		addError($('#price-error'), validateMoney(price, '$', true));
		addError($('#img-error'), validateFile(img, null, 500000, ['svg', 'png', 'jpg', 'jpeg']));
		addError($('#description-error'), validateSimpleText(description, 'descripción', 500, true, 'La'));

		for(let i=1; i<=$('#proccess-form fieldset .row .caracteristica').length; i++){
			let caracteristica=$('#proccess-form fieldset .row .caracteristica:nth-child('+i+') input').val().trim(),
			errContent=$('#proccess-form fieldset .row .caracteristica:nth-child('+i+') .error'), validate=null, obligatory=null;

			if(i==1){
				obligatory=true;
			}

			//validate=validateSimpleText(caracteristica, 'característica', 100, obligatory, 'La');

			if(validate==null){
				caracteristicas.push(sanitizeString(caracteristica));
			}

			addError(errContent, validate);
		}

		if(valid==true){
			let data=new FormData();

			data.append('type_category', type_category);
			if(type_category){
				data.append('category', new_category);
			}else{
				data.append('category', category);
			}
			data.append('name', name);
			data.append('price', price);
			data.append('img', img);
			data.append('description', description);

			caracteristicas.map((val)=>{
				data.append('caracteristicas', val);
			});

			try{
				let res=await $.ajax({
					url: '/sacp/planes/add',
					type:'post',
					dataType:'json',
					data:data,
					cache:false,
					contentType:false,
					processData:false,
					timeout: 30000
				});

				if(res.success){
					createNotification('¡Registro Exitoso!', 'Se ha registrado el Plan correctamente.', 'success');
					closeForm();
				}else if(res.errno){
					let title=null, message=null, loc=window.location;
					switch (res.errno){
						case 'NOT LOGINED USER':
							window.location=loc.origin+'/sacp/login/';
							break;
						
						case 'DATABASE ERROR':
							title= '¡Error en servidor!';
							message='Se ha detectado el siguiente error en el servidor:<br><i>"'+res.message+'</i>".';
							break;

						case 'INCOMPLETE VALUES':
							title= '¡Error en envío de datos!';
							message='Faltan valores en para que el proceso se ejecute correctamente. Recargue la página y evite modificar los recursos de la misma.';
							break;

						case 'INVALID DATA':
							veryfyVarServerError(res.errors, 'category', $('#category-error'));
							veryfyVarServerError(res.errors, 'name', $('#name-error'));
							veryfyVarServerError(res.errors, 'price', $('#price-error'));
							veryfyVarServerError(res.errors, 'decription', $('#decription-error'));

							res.errors.caracteristicas.forEach((err, i) => {
								if(err){
									$('#proccess-form fieldset .caracteristica:nth-child('+(i+1)+') .error').html(err);
								}
							});
							break;

						default:
							title= '¡Error inesperado!';
							message='Ha ocurrido un error inesperado. Estamos trabajando por resolverlo.';
							break;
					}
					if(title!=null){
						createNotification(title, message, 'fail');
					}
				}
			}catch(e){
				if(e.status){
					createNotification('¡Error de conexión!', 'Asegúrese de estar conectado a internet.', 'fail');
				}else{
					createNotification('¡Error inesperado!', 'Ha ocurrido un error en el servidor al procesar los datos. Ya nos encontramos trabajando para resolver el problema.', 'fail');
				}
			}
		}

		processForm.disable();
	}
}

$('#proccess-form').ready(()=>{
	processForm=new ProcessForm($('#second-loader'), $('#process-form button[type="submit"]'));
	let caracteristicas=new Caracteristicas($('#proccess-form fieldset .row'), $('#add-caracteristica')), img=$('#img'),
	imgParams={
		minSize:null,
		maxSize:500000,
		accepted:['svg', 'png', 'jpg', 'jpeg']
	};

	checkType($('#registred_type'), $('#new_category'), $('#category'), true);

	$('#back-form').click(()=>{
		$('#data-section').slideDown(500);
		$('#form-section').slideUp(500);
	});

	verifiqueFileContent($('#img-content'), imgParams, $('#img-error'));

	$('#img-content').change(()=>{
		verifiqueFileContent($('#img-content'), imgParams, $('#img-error'));
	});

	$('#nuevo').click(()=>{
		$('#form-section .header .type-form .i').removeClass('fa-edit');
		$('#form-section .header .type-form b').html('NUEVO PLAN');
		$('#form-section .title-editer').hide();
		$('#form-section').slideDown(500);
		$('#data-section').slideUp(500);
	});

	typeSingleFormatJQ($('#new_category'), upperCase);
	typeSingleFormatJQ($('#price'), dollarFormat);

	$('#proccess-form').submit(submitPlan);

	socket.on('planes:new', function(data){
		let { plan, categoy }=data, plantilla=`
			<div class="item" style="display:none">
				<div class="container" style="border-color: teal">
					<div class="head bettwenFlex">
						<b>
							${category.name}
						</b>
						<div class="dropdown relative">
							<button class="options btn dropdown-toggle centerFlex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i class="fa fa-ellipsis-v"></i>
							</button>

							<ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
								<li>
									<button type="button" class="watch dropdown-item">
										<i class="fa fa-eye"></i>
										Ver
									</button>
								</li>
								<li>
									<button type="button" class="edit dropdown-item">
										<i class="fa fa-edit"></i>
										Editar
									</button>
								</li>
								<li>
									<button type="button" class="del dropdown-item">
										<i class="fa fa-trash-alt"></i>
										Eliminar
									</button>
								</li>
							</ul>
						</div>
					</div>

					<div class="title centerFlex" style="color: teal;">
						<b>${plan.name}</b>
					</div>

					<div class="texto">
						<p class="precio">${extractNumberInText(plan.price.toString().substring(0,plan.price.toString().length-2))} <b>${plan.denominator_price}</b></p>
						<p>Características <b>(${plan.features.length})</b></p>
					</div>

					<div class="bettwenFlex">
						<div class="img">
							<div style="background-image: url('/server-files/content/planes/${plan.img}');"></div>
						</div>

						<div class="info">
							<p><i class="fa fa-user-edit"></i> MALAVEN</p>
							<p><i class="fa fa-calendar-check"></i> 20/04/2021</p>
						</div>
					</div>
				</div>
			</div>
		`;
		$('#data-section .data-items').append(plantilla);

		$('#data-section .data-items .item:last-child').slideDown(500);
	});
});