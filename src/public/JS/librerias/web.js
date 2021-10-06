function footerPosition(){
	$('body').css('margin-bottom', $('#footer').css('height'));
}

function goSection(button){
	let id='', section='';

	if((typeof button.attr('id'))!='undefined'){
		id=button.attr('id');
		section=id.match(/\w*-/gi);

		if(section!=null){
			section=section[0];
			section=section.substring(0, section.length-1);

			button.click(()=>{
				let sectionTop=$('#'+section).offset().top, time=window.scrollY-sectionTop, navSize=sizeRecort($('#nav').css('height'));

				if(time<0){
					time=time*(-1);
				}

				if(window.innerWidth<=760){
					navSize=0;
				}

				if($('#'+section).length){
					$('html').animate({
						scrollTop: sectionTop-navSize
					}, time);
				}

				if(window.innerWidth<=760){
					$('#nav').fadeOut(500);
				}
			});
		}
	}
}

function showOptions(button, element, showFunction, hideFunction){
	let over=false, id=button[0].id, elementId=element[0].id, hide=()=>{
		if(hideFunction){
			hideFunction(button, element);
		}else{
			element.hide();
		}
	};
	if(id.length<1){
		id=asignId('drop_button');
		button[0].id=id;
	}
	if(elementId.length<1){
		elementId=asignId('drop-list');
		element[0].id=elementId;
	}

	button.mouseover(()=>{
		over=true;
	}).mouseout(()=>{
		over=false;
	}).click(()=>{
		if(showFunction){
			showFunction(button, element);
		}else{
			element.show();
		}
	});

	$('#'+elementId+' .drop-item a, #'+elementId+' .drop-item button').click(()=>{
		if(window.innerWidth<=760){
			$('#nav').fadeOut(500);
		}
	});

	$(window).click(()=>{
		if(over==false){
			hide();
		}
	}).resize(()=>{
		if(window.innerWidth<=760){
			hide();
		}
	});
}

$('#navegacion').ready(()=>{
	var menu=$('#menu'), menu_list=$('#menu-list');

	$(window).resize(()=>{
		let nav=$('#nav');
		if(window.innerWidth>650){
			menu_list.show();
		}else{
			menu_list.hide();
		}

		if(window.innerWidth>760){
			nav.css('opacity', 1).css('display', 'flex');
		}else{
			nav.css('opacity', 0).css('display', 'none');
		}

		window_width=window.innerHeight;
	});

	for(let i=1; i<=$('#nav-list .li-item').length; i++){
		goSection($('#nav-list .li-item:nth-child('+(i+1)+') .go:first-child'));

		if($('#nav-list .li-item:nth-child('+(i+1)+') .drop-button').length>0){
			showOptions($('#nav-list .li-item:nth-child('+(i+1)+') .drop-button:first-child'), $('#nav-list .li-item:nth-child('+(i+1)+') .drop-list'),
			(button, element)=>{
				element.slideDown(250);
				if(hasClass(button, 'active')==false){
					button.addClass('active');
				}
			},
			(button, element)=>{
				element.slideUp(250);
				if(hasClass(button, 'active')){
					button.removeClass('active');
				}
			});
		}
	}

	$('#menu-button').click(()=>{
		let nav=$('#nav');
		if(window.innerWidth<=760){
			nav.css('opacity', 0).css('display', 'flex');

			nav.animate({
				opacity: 1
			},500);
		}
	});

	$('#nav-list .header .close').click(()=>{
		$('#nav').fadeOut(500);
	});
});

$(document).ready(()=>{
	footerPosition();

	$(window).resize(()=>{
		footerPosition();
	});

	// Preloader:
	$('#general-loader').fadeOut(500);
});