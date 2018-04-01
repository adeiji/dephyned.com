var mandrill = require('./mandrill.js');

function start ()
{
	//Load all the different javascript and node modules
	var http = require("http");
	var fs = require("fs");
	var express = require('express');
	var app = express();
  var mongoose = require('mongoose');

  if (process.env.ENV == 'production') {
    var mongoDB = "mongodb://adeiji:Daniel2441914!!@localhost:27017/graffiti";
  } else {
    var mongoDB = "mongodb://localhost/graffiti"
  }

  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

	app.configure(function () {
		app.use(express.bodyParser());
		app.use(app.router);

		app.all('/', function(req, res, next) {
  			res.header("Access-Control-Allow-Origin", "*");
  			res.header("Access-Control-Allow-Headers", "Content-Type");
  			next();
 		});
	});

	app.post('/sendEmail', mandrill.sendEmail)
	app.use(express.static(__dirname));	
	app.listen(process.env.PORT || 8080);
};

exports.start = start;