const { Schema, model }=require('mongoose');

const category_plan=new Schema({
	name: {
		type:String,
		unique: true,
		required: true
	},
	date_creation: Date,
	date_update:{
		type:Date,
		default: new Date()
	},
	author:{
		type: String,
		default: 'admin'
	},
	updater: String
});

module.exports = model('category_plan', category_plan);