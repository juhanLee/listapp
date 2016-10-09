var mongoose = require('mongoose');

var  Schema = mongoose.Schema;
var connection = mongoose.createConnection("mongodb://localhost/list");

var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);


var listSchema = new mongoose.Schema({

	name : String,
	email : String,
	number : String,
	date : { type: Date, default: Date.now }},
	{
    versionKey: false
	}

);

listSchema.plugin(
	autoIncrement.plugin,
	{
		model : 'list',
		field : 'num',
		startAt : 1,
		incrementBy : 1
	}
);

var List = mongoose.model('List', listSchema);
module.exports = List;
