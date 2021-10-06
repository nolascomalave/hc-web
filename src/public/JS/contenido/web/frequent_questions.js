function openQuestion(quest){
	if(hasClass(quest, 'opened')==false){
		quest.addClass('opened');
	}
}

function closeQuestion(quest){
	if(hasClass(quest, 'opened')){
		quest.removeClass('opened');
	}
}

function controllQuestion(quest){
	let id='';
	if(quest[0].id==''){
		asignId(quest);
	}
	id=quest[0].id;

	$('#'+id+' .open').click(()=>{
		openQuestion(quest);
	});
	$('#'+id+' .close').click(()=>{
		closeQuestion(quest);
	});
}

$('#search-form').ready(()=>{
	typeSingleFormatJQ($('#search'), searchFormat);
});

$('#preguntas-section').ready(()=>{
	for(let i=1; i<=$('#preguntas-section .preguntas .pregunta').length; i++){
		controllQuestion($('#preguntas-section .preguntas .pregunta:nth-child('+i+')'));
	}
});