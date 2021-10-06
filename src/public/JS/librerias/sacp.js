const socket=io();

function changeNavState(button, body){
	let state=true;

	button.click(()=>{
		if(state==true){
			addClass(body, 'retracted-aside');
			state=false;
		}else{
			removeClass(body, 'retracted-aside');
			state=true;
		}
	});
}

$(document).ready(()=>{
	changeNavState($('#change-nav-state'), $('#body'));
})