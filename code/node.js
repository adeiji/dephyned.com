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
  var https = require('https');

  console.log(process.env.ENV);
  if (process.env.ENV == 'production' || process.env.ENV == 'staging') {
    var mongoDB = "mongodb://adeiji:Daniel2441914!!@localhost:27017/graffiti";
  } else {
    var mongoDB = "mongodb://localhost/graffiti"
  }

  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.use(bodyParser.json());

  app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.header("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader('Access-Control-Allow-Credentials', false);

      next();
  });
	
	app.post('/sendEmail', mandrill.sendEmail)
  app.use(express.static(__dirname + '/static'));
  app.use(express.static(__dirname + '/static/graffiti/share/beta'))
  
  app.get('/salesPitch', function (req, res) {
    res.send(
      {         
        messages: ["Subscribe now to keep playing and see how Dawud's story will end. Level 2 coming July 16th.","Subscribe before July 1, 2018 and get 30% off. That's $3.49 a month instead of $4.99 a month."],
        title: "Level 2 coming July 16th.",
        website: "For more information, visit:",
        buttonText: "Subscribe now for 3.49/month",
        productIds: ["com.dephyned.trafod"]
      })
  })

  app.post('/verifyReceipt', function (req, res) {

  })

  if (process.env.ENV == "staging") {
    const options = {
      cert: fs.readFileSync('/etc/letsencrypt/live/staging.dephyned.com/fullchain.pem'),
      key: fs.readFileSync('/etc/letsencrypt/live/staging.dephyned.com/privkey.pem')
    }

    app.listen(process.env.PORT || 8080);
    https.createServer(options, app).listen(8443)
  } else if (process.env.ENV == "production") {
    const options = {
      cert: fs.readFileSync('/etc/letsencrypt/live/dephyned.com/fullchain.pem'),
      key: fs.readFileSync('/etc/letsencrypt/live/dephyned.com/privkey.pem')
    }

    app.listen(process.env.PORT || 8080);
    https.createServer(options, app).listen(8443)
  } else {
    app.listen(process.env.PORT || 8080);
  }
};

exports.start = start;