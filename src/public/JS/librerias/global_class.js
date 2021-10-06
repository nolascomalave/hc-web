class Height_long_card {
	constructor(height_long_card){
		this.content=height_long_card;
		this.id=this.content[0].id;

		if(this.id==''){
			this.id=asignId('height_long_card_content');
			this.content[0].id=this.id;
		}

		this.cardsLenght=$('#'+this.id+' .height-long-card').length;
		this.firstItem=0;

		if(this.cardsLenght>0){
			this.firstItem=1;
		}

		this.prevButton=$('#'+this.id+' .prev');
		this.nextButton=$('#'+this.id+' .next');

		this.windowWidth=window.innerWidth;
	}

	start(){
		let putButton=(button)=>{
			if(hasClass(button, 'inactiveButton')){
				button.removeClass('inactiveButton');
			}
		},
		removeButton=(button)=>{
			if(hasClass(button, 'inactiveButton')==false){
				button.addClass('inactiveButton');
			}
		},
		countItems=(max)=>{
			if(this.cardsLenght>max){
				putButton(this.nextButton);
			}else{
				removeButton(this.nextButton);
			}
		}, validateSize=()=>{
			if(window.innerWidth>800){
				countItems(4);
			}else if(window.innerWidth>500 && window.innerWidth<=800){
				countItems(3);
			}else if(window.innerWidth>200 && window.innerWidth<=500){
				countItems(2);
			}else if(window.innerWidth<=200){
				countItems(1);
			};
		},
		showPrev=(iterations)=>{
			for(let i=0; i<iterations; i++){
				if(this.firstItem>1){
					let item=$('#'+this.id+' .height-long-card:nth-child('+(this.firstItem-1)+')');
					if(hasClass(item, 'inactive')){
						item.removeClass('inactive');
					}
					this.firstItem--;
				}
			}
		};

		validateSize();

		for(let i=1; i<=this.cardsLenght; i++){
			let hide=false;
			if(i>4 && window.innerWidth>800){
				hide=true;
			}else if(i>3 && (window.innerWidth>500 && window.innerWidth<=800)){
				hide=true;
			}else if(i>2 && (window.innerWidth>200 && window.innerWidth<=500)){
				hide=true;
			}else if(i>1 && window.innerWidth<=200){
				hide=true;
			}

			if(hide==true){
				$('#'+this.id+' .height-long-card:nth-child('+i+')').addClass('inactive');
			}
		}

		this.prevButton.click(()=>{
			this.prev();
		});

		this.nextButton.click(()=>{
			this.next();
		});

		$(window).resize(()=>{
			let max=0;
			if(window.innerWidth>800){
				max=4;
			}else if((window.innerWidth>500 && window.innerWidth<=800)){
				max=3;
			}else if((window.innerWidth>200 && window.innerWidth<=500)){
				max=2;
			}else if(window.innerWidth<=200){
				max=1;
			}

			for(let i=this.firstItem; i<=this.cardsLenght; i++){
				let hide=false, item=$('#'+this.id+' .height-long-card:nth-child('+i+')');
				if(i>(this.firstItem+3) && max==4){
					hide=true;
				}else if(i>(this.firstItem+2) && max==3){
					hide=true;
				}else if(i>(this.firstItem+1) && max==2){
					hide=true;
				}else if(i>this.firstItem && max==1){
					hide=true;
				}

				if(hide==true){
					item.addClass('inactive');
				}else{
					if(hasClass(item, 'inactive')){
						item.removeClass('inactive');
					}
				}
			}

			validateSize();

			if(window.innerWidth>this.windowWidth){
				let actives=$('#'+this.id+' .inactive').length;
				actives=this.cardsLenght-actives;

				if(actives<max){
					if(this.firstItem>1){
						this.prevButton.addClass('inactiveButton');
					}
					showPrev(max-actives);
				}
			}

			if(this.firstItem+(max-1)==this.cardsLenght){
				removeButton(this.nextButton);
			}

			this.windowWidth=window.innerWidth;
		});
	}

	prev(){
		let max=0;
		if(window.innerWidth>800){
			max=4;
		}else if(window.innerWidth>500 && window.innerWidth<=800){
			max=3;
		}else if(window.innerWidth>200 && window.innerWidth<=500){
			max=2;
		}else if(window.innerWidth<=200){
			max=1;
		};
		if(this.cardsLenght>max){
			if(this.firstItem-1==1){
				this.prevButton.addClass('inactiveButton');
			}

			if(hasClass(this.nextButton, 'inactiveButton')==true){
				this.nextButton.removeClass('inactiveButton');
			}

			if(this.firstItem<=this.cardsLenght && this.firstItem>0){
				$('#'+this.id+' .height-long-card:nth-child('+(this.firstItem-1)+')').removeClass('inactive');
				$('#'+this.id+' .height-long-card:nth-child('+(this.firstItem+(max-1))+')').addClass('inactive');
				this.firstItem--;
			}
		}
	}

	next(){
		let max=0;
		if(window.innerWidth>800){
			max=4;
		}else if(window.innerWidth>500 && window.innerWidth<=800){
			max=3;
		}else if(window.innerWidth>200 && window.innerWidth<=500){
			max=2;
		}else if(window.innerWidth<=200){
			max=1;
		};
		if(this.cardsLenght>max){
			let mas=this.firstItem+(max-1);
			if(this.firstItem+max==this.cardsLenght){
				this.nextButton.addClass('inactiveButton');
			}

			if(hasClass(this.prevButton, 'inactiveButton')){
				this.prevButton.removeClass('inactiveButton');
			}

			if(mas<this.cardsLenght){
				$('#'+this.id+' .height-long-card:nth-child('+(this.firstItem+max)+')').removeClass('inactive');
				$('#'+this.id+' .height-long-card:nth-child('+(this.firstItem)+')').addClass('inactive');
				this.firstItem++;
			}
		}
	}

	add(titulo, verticalText, img, url, id){
		let err=null, idNode='';

		if(idNode=='' || idNode==null){
			idNode=asignId('height-long-card-node');
		}

		let plantilla=`
			<figure id='`+idNode+`' class="height-long-card inactive" style="background-image: url('`+img+`');">
				<img src="`+img+`">
				<figcaption class="allScreen bettwenFlex">
					<p class="principal-text">
						`+titulo+`
					</p>

					<div class="vertical-text bettwenFlex">
						<p>
							`+verticalText+`
						</p>

						<a href="`+url+`">
							Ir
						</a>
					</div>
				</figcaption>
			</figure>
		`;

		if(err==null){
			$('#'+this.id+' .height-long-card:nth-child('+(this.cardsLenght)+')').after(plantilla);
			this.cardsLenght++;
			if(hasClass(this.nextButton, 'inactiveButton')){
				this.nextButton.removeClass('inactiveButton');
			}
		}

		return err;
	}

	//-------------------------------------------------------------------------------------
	// Éste tiene defectos. Debe modificarse también la función de eliminación;
	//-------------------------------------------------------------------------------------
	/*edit(child, titulo, verticalText, img, url){
		let del=this.firstItem-1, childNode=$('#'+child);
		if(this.firstItem==1){
			del=5;
		}

		childNode.addClass('inactive');
		$('#'+this.id+' .height-long-card:nth-child('+del+')').removeClass('inactive');

		setTimeout(()=>{
			$('#'+child+' img').attr('src', img);
			$('#'+child+' figcaption .principal-text').html(titulo);
			$('#'+child+' figcaption .vertical-text p').html(verticalText);
			$('#'+child+' figcaption .vertical-text').attr('href', url);

			childNode.removeClass('inactive');
			$('#'+this.id+' .height-long-card:nth-child('+del+')').addClass('inactive');
		}, 500);
	}

	delete(child){
		let err=null;
		if(child){
			if(child>this.cardsLenght){
				err={
					errno:'SUPERED LIMIT',
					message:'¡El número del nodo supera la cantidad de nodos existentes!'
				}
			}else if(!parseInt(child)){
				err={
					errno:'INVALID DATA',
					message:'¡El parámetro dado en la función debe ser un valor numérico entero!'
				}
			}
		}else{
			err={
				errno:'NOT DATA',
				message:'¡Falta el número del nodo a agregar!'
			}
		}

		if (err==null) {
			let childNode=$('#'+this.id+' .height-long-card:nth-child('+(child)+')');
			if(hasClass(childNode, 'inactive')){
				childNode.remove();
			}else if(this.cardsLenght>4){
				let del=this.firstItem-1;
				if(this.firstItem==1){
					del=5;
				}

				childNode.addClass('inactive');
				$('#'+this.id+' .height-long-card:nth-child('+del+')').removeClass('inactive');
				setTimeout(()=>{
					childNode.remove();
				}, 500);
			}
			this.cardsLenght--;
		}

		return err;
	}*/
}

class MediaReproductor{
	constructor(screenQuery, mediaSelectorQuery, prevButton, nextButton, loader){
		//let screenQueryId=document.querySelector(this.screenQuery).id, mediaSelectorQueryId=document.querySelector(this.mediaSelectorQuery).id;


		this.screen=$(screenQuery);
		this.mediaSelector=$(mediaSelectorQuery);
		this.nextButton=$(nextButton);
		this.prevButton=$(prevButton);
		this.loader=$(loader);

		/*if(screenQueryId==''){
			screenQueryId=asignId('mediaReproductor');
			this.screen.id=screenQueryId;
		}

		if(mediaSelectorQueryId==''){
			mediaSelectorQueryId=asignId('mediaReproductor-selector');
			this.mediaSelector.id=mediaSelectorQueryId;
		}*/

		addId(this.screen, 'mediaPlayes');
		addId(this.mediaSelector, 'mediaPlayes-selector');
		addId(this.prevButton, 'mediaPlayes-prev-controll');
		addId(this.nextButton, 'mediaPlayes-next-controll');
		addId(this.loader, 'loader');

		this.select_media=screenQuery+' .media';
		this.media_items_content=mediaSelectorQuery;
		this.media_length=0;
		this.selectedMedia=null;
		this.selectedMediaCount=0;

		this.nextButton.click(()=>{
			this.next();
		});

		this.prevButton.click(()=>{
			this.prev();
		});

		this.start();
	}

	start(){
		this.media_length=$(this.select_media).length;
		if(this.media_length>0){
			this.selectedMedia=$(this.select_media+':nth-child(1)');
			this.selectedMediaCount=1;

			for(let i=1; i<=this.media_length; i++){
				let item=$(this.select_media+':nth-child('+i+')'), tag=item[0].tagName.toUpperCase(), button='', clase='', valid=true;
				item[0].id='';
				addId(item, 'media_player_item');
				if(i==1){
					clase=clase+' active';
					item.addClass('active-item');
				}else{
					item.addClass('hide');
				}

				if(tag=='IMG'){
					button=`
						<button class="smallMedia`+clase+`" style="background-image: url('`+item.attr('src')+`');" title='`+item.attr('media-name')+`' media-refference='`+item[0].id+`'></button>
					`;
				}else if(tag=='VIDEO'){
					button=`
						<button class="smallMedia video`+clase+`" style="background-image: url('`+item.attr('poster')+`');" title='`+item.attr('media-name')+`' media-refference='`+item[0].id+`'>
							<div class="allScreen centerFlex">
								<i class="fa fa-play"></i>
							</div>
						</button>
					`;
				}else{
					item.remove();
					valid=false;
				}

				if(valid){
					this.mediaSelector.append(button);
					button=$(this.media_items_content+' .smallMedia[media-refference="'+item[0].id+'"]');
					button.click(()=>{
						if(button[0].disabled==false){
							this.changeMedia(button.attr('media-refference'));
						}
					});
				}
			}
		}
	}

	prev(){
		let prev=null;
		if(this.media_length>0){
			if(this.selectedMedia[0].previousElementSibling==null){
				prev=this.media_length;
			}else{
				prev=this.selectedMedia[0].previousElementSibling.id;
			}
			this.changeMedia(prev);
		}
	}

	next(){
		let next=0;
		if(this.media_length>0){
			if(this.selectedMedia[0].nextElementSibling==null){
				next=1;
			}else{
				next=this.selectedMedia[0].nextElementSibling.id;
			}
			this.changeMedia(next);
		}
	}

	changeMedia(next){
		let buttonState=()=>{
			for(let i=1; i<=$(this.media_items_content+' .smallMedia').length; i++){
				let button=$(this.media_items_content+' .smallMedia:nth-child('+i+')')[0];
				button.disabled=!button.disabled;
			}
		};

		if(isNaN(next)){
			next=$('#'+next);
		}else{
			next=$(this.select_media+':nth-child('+next+')');
		}

		if(this.selectedMedia[0].id!=next[0].id){
			this.loader.show();
			buttonState();
			let prev=this.selectedMedia, img=new Image();

			if(prev[0].tagName=='VIDEO' && prev[0].paused==false){
				prev[0].pause();
			}

			$('#'+this.mediaSelector[0].id+' .smallMedia[media-refference="'+prev[0].id+'"]').removeClass('active');
			$('#'+this.mediaSelector[0].id+' .smallMedia[media-refference="'+next[0].id+'"]').addClass('active');

			prev.removeClass('active-item');

			this.selectedMedia=next;
			//this.selectedMediaCount=;

			prev.addClass('hide');

			next.removeClass('hide');
			next.addClass('active-item');
			img.onload=()=>{
				buttonState();
				this.loader.hide();
			};
			if(this.selectedMedia[0].tagName=='VIDEO'){
				if(this.selectedMedia[0].poster!=''){
					img.src=this.selectedMedia[0].poster;
				}else{
					buttonState();
					this.loader.hide();
				}
			}else{
				img.src=this.selectedMedia[0].src;
			}
		}
	}

	add(element){
		let plantilla='', valid=true;

		if(element.type.toUpperCase()=='VIDEO'){
			plantilla=`
				<video
				src="`+element.src+`"
				poster="`+element.poster+`"
				class="media hide"
				media-name='`+element.title+`'
				controls>
				</video>
			`;
		}else if(element.type.toUpperCase()=='IMG'){
			plantilla=`
				<img
				src="`+element.src+`"
				class="media hide"
				media-name='`+element.title+`'>
			`;
		}else{
			valid=false;
		}

		if(valid==true){
			$(this.select_media+':nth-child('+(this.media_length)+')').after(plantilla);
			this.media_length++;

			let item=$(this.select_media+':nth-child('+(this.media_length)+')'), tag=item[0].tagName.toUpperCase(), button='', clase='', valid=true, i=this.media_length;
			addId(item, 'media_player_item');
			if(i==1){
				clase=clase+' active';
				item.addClass('active-item');
			}else{
				item.addClass('hide');
			}

			if(tag=='IMG'){
				button=`
					<button class="smallMedia`+clase+`" style="background-image: url('`+item.attr('src')+`');" title='`+item.attr('media-name')+`' media-refference='`+item[0].id+`'></button>
				`;
			}else if(tag=='VIDEO'){
				button=`
					<button class="smallMedia video`+clase+`" style="background-image: url('`+item.attr('poster')+`');" title='`+item.attr('media-name')+`' media-refference='`+item[0].id+`'>
						<div class="allScreen centerFlex">
							<i class="fa fa-play"></i>
						</div>
					</button>
				`;
			}else{
				item.remove();
				valid=false;
			}

			if(valid){
				this.mediaSelector.append(button);
				button=$(this.media_items_content+' .smallMedia[media-refference="'+item[0].id+'"]');
				button.click(()=>{
					if(button[0].disabled==false){
						this.changeMedia($('#'+button.attr('media-refference')));
					}
				});
			}
		}
	}

	delete(item){
		let button=null;
		for(let i=1; i<=this.media_length; i++){
			let btn=$(this.media_items_content+' .smallMedia:nth-child('+i+')');
			if(btn.attr('media-refference')==item[0].id){
				button=btn;
				break;
			}
		}

		if(hasClass(item, 'active-item')){
			if(item[0].nextElementSibling==null){
				this.changeMedia($(this.select_media+':nth-child(1)'));
			}else{
				this.changeMedia($('#'+item[0].nextElementSibling.id));
			}
		}

		button.addClass('inactive');
		setTimeout(()=>{
			item.remove();
			button.remove();
		}, 1000);
	}

	reset(contenido, url){
		let type=typeof contenido;

		this.loader.show();
		
		if(type=='array' || type=='string'){
			this.screen.html('');
			this.mediaSelector.html('');

			if(type=='array'){
				for(let i=0; i<contenido.length; i++){
					this.screen.append(contenido[i]);
				}
			}else{
				this.screen.append(contenido);
			}


			this.media_length=0;
			this.selectedMedia=null;
			this.selectedMediaCount=0;

			this.start();
		}else{
			let data = new FormData();

			data.append('errno', 'INVALID DATA');
			data.append('message', '¡Ha ocurrido un error al resetear el reprodoductor de proyectos, pues el contenido es incorrecto!');

			$.ajax({
				url: url,
				type:'post',
				dataType:'json',
				data:data,
				cache:false,
				contentType:false,
				processData:false
			}).then((response)=>{
				if('success' in response){
					createNotification('¡Envío realizado!', 'Ha ocurrido un error al mostrar el contenido del proyecto seleccionado. Ya se ha enviado un mensaje de alerta a los desarrolladores.', 'success', '/IMG/iconos/fail.svg');
				}
			});
		}

		this.loader.fadeOut(1000);
	}
}

class GetProyect{
	constructor(contenedor, proyectData, loader, url){
		let id='', urlProyects='';
		addId(contenedor, 'proyect-description');

		if((typeof url)=='string' || url.length>0){
			urlProyects=url;
		}

		this.urlProyects=urlProyects;

		this.contenedor=contenedor;
		id=contenedor[0].id;

		this.description=$('#'+id+' .text');
		this.date=$('#'+id+' .date');
		this.indicators=$('#'+id+' .proyect-indicator');
		this.containerControls=$('#'+id+' .work-controls');
		this.prevButton=$('#'+id+' .work-controls .prev');
		this.nextButton=$('#'+id+' .work-controls .next');
		this.loader=loader;

		this.nextButton.click(()=>{
			let item=null;
			if(this.selectedProyect[0].nextElementSibling!=null){
				let reference=this.selectedProyect[0].nextElementSibling.attributes.getNamedItem('proyect-refference').value;

				item=$('#'+this.indicators[0].id+' .indicator[proyect-refference="'+reference+'"]');
			}else{
				item=$('#'+this.indicators[0].id+' .indicator:nth-child(1)');
			}

			this.changeProyect(item);
		});

		this.prevButton.click(()=>{
			let item=null;
			if(this.selectedProyect[0].previousElementSibling!=null){
				let reference=this.selectedProyect[0].previousElementSibling.attributes.getNamedItem('proyect-refference').value;
				item=$('#'+this.indicators[0].id+' .indicator[proyect-refference="'+reference+'"]');
			}else{
				item=$('#'+this.indicators[0].id+' .indicator:nth-child('+this.lengthProyect+')');
			}
			this.changeProyect(item);
		});

		addId(this.indicators, 'proyect-idicator-section');

		this.selectedProyect=null;
		this.lengthProyect=0;
		this.processing=false;

		this.proyectPlayer=new MediaReproductor(proyectData.screenQuery, proyectData.mediaSelectorQuery, proyectData.prevButton, proyectData.nextButton, proyectData.loader);
		this.start();
	}

	start(){
		this.lengthProyect=$('#'+this.indicators[0].id+' .indicator').length;
		if(this.lengthProyect>0){
			for(let i=1; i<=this.lengthProyect; i++){
				let item=$('#'+this.indicators[0].id+' .indicator:nth-child('+i+')'), attr=item.attr('proyect-refference');

				if(attr==undefined || attr==null || attr.trim()==''){
					item.addClass('hide').addClass('deletable');
				}else{
					if(i==1){
						this.selectedProyect=item;
						if(hasClass(item, 'selected')==false){
							item.addClass('selected');
						}
					}else{
						if(hasClass(item, 'selected')){
							item.removeClass('selected');
						}
					}
				}
			}

			$('#'+this.indicators[0].id+' .deletable').remove();
			this.lengthProyect=$('#'+this.indicators[0].id+' .indicator').length;

			if(this.lengthProyect<=1){
				this.containerControls.hide();
				this.indicators.hide();
			}
		}
	}

	changeProyect(item){
		if((this.lengthProyect>1 || item.length==1) && this.processing==false){
			let data = new FormData();
			this.processing=true;
			this.loader.show();

			data.append('id', item.attr('proyect-refference'));

			$.ajax({
				url: this.urlProyects,
				type:'post',
				dataType:'json',
				data:data,
				cache:false,
				contentType:false,
				processData:false,
				timeout: 30000
			}).fail(()=>{
				this.processing=false;
				this.loader.hide();
				createNotification('¡Error de conexión!', 'Ha ocurudo un error al establecer la conexión con el servidor. Revise su conexión a internet.', 'fail');
			}).then((response)=>{
				if('success' in response){
					let { proyect }=response;
					this.selectedProyect.removeClass('selected');
					item.addClass('selected');
					this.selectedProyect=item;

					let plantilla='<h1>'+proyect.title+'</h1>', media=``;

					proyect.media.map(el =>{
						if(el.type=='image'){
							media=media+'<img src="'+el.src+'" class="media"/>';
						}else if(el.type=='video'){
							media=media+'<video src="'+el.src+'" class="media" controls></video>';
						}
					});

					plantilla=plantilla+proyect.description;

					this.description.html(plantilla);
					this.date.html('Publicado el '+proyect.creation.date);
					this.proyectPlayer.reset(media);
				}else if(response.errno="NOT FOUND"){
					createNotification('¡Proyecto no encontrado!', response.message, 'fail');
				}else{
					createNotification('¡Error inesperado!', 'Ha ocurudo un error al intentar obtener el proyecto requerido. Estamos resolviendo el problema', 'fail');
				}

				this.processing=false;
				this.loader.hide();
			});
		}
	}
}