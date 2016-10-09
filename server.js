// MEAN Stack RESTful API Tutorial - 이주한

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose    = require('mongoose');
var uri = 'mongodb://localhost/list';
var db =mongoose.connection;
mongoose.Promise = global.Promise;

	db.on('error', function(err,data){
		if(err)console.error('db conn err',err);
	});
	db.once('open', function callback(){
			console.info('Mongo conn successfully');
	});

mongoose.connect(uri);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


var List = require('./model/list');
var router = require('./router/router')(app, List);



//서버 포트 설정.
var server = app.listen('80', function(){
  console.log("Server running on port 80");
});
