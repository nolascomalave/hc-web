const client=require('redis').createClient();
client.subscribe('planes');

module.exports=async (io)=>{
	client.on('message', (chanel, data) =>{
		data=JSON.parse(data);

		if(data.request=='new'){
			io.sockets.emit('planes:new', {
				plan:data.plan,
				category:data.category
			});
		}
	});
}