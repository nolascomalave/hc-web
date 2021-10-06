const { Schema, model }=require('mongoose');

const Plan=new Schema({
	name: {
		type:String,
		required: true,
		unique:false
	},
	price: {
		type: Number,
		required: true
	},
	denominator_price: {
		type:String,
		default: '$'
	},
	img:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	features: {
		type:Array,
		required:true
	},
	date_creation: Date,
	date_update:{
		type:Date,
		default: new Date()
	},
	category: {
		type:String,
		required: true
	},
	author:{
		type: String,
		default: 'admin'
	},
	updater: String
});

module.exports = model('Plan', Plan);