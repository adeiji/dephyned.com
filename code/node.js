var mandrill = require('./mandrill.js');

function start ()
{
	//Load all the different javascript and node modules
	var http = require("http");
	var fs = require("fs");
	var express = require('express');
	var app = express();
  var mongoose = require('mongoose');
  var bodyParser = require('body-parser');

  console.log(process.env.ENV);
  if (process.env.ENV == 'production') {
    var mongoDB = "mongodb://adeiji:Daniel2441914!!@localhost:27017/graffiti";
  } else {
    var mongoDB = "mongodb://localhost/graffiti"
  }

  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.use(bodyParser.json());

  app.all('/', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.header("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader('Access-Control-Allow-Credentials', false);

      next();
  });
	
	app.post('/sendEmail', mandrill.sendEmail)
	app.use(express.static(__dirname));	
	app.listen(process.env.PORT || 8080);
};

exports.start = start;

//%2Fopt%2Fbitnami%2Fmongodb%2Ftmp%2Fmongodb-27017.sock