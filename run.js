var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require("request");
var qs = require('querystring'),
    oauth = {
      callback: 'http://chequein.herokuapp.com/callback/',
      client_key: CONSUMER_KEY,
      client_secret: CONSUMER_SECRET
    },
    url = 'https://api.venmo.com/v1/oauth/access_token';
var openurl = require('openurl');

var urlencodedParser = parser.urlencoded({ extended: false });

app.use(express.static(__dirname));

app.post('/login', urlencodedParser, function(req, res) {
  // Handle login via Venmo here
  console.log("Handling login now");
  //request.get("https://api.venmo.com/v1/oauth/authorize?client_id=2386&scope=make_payments%access_friends&response_type=code", {
    //console.log(body);
    //console.log(resp);
  //});
  openurl.open("https://api.venmo.com/v1/oauth/authorize?client_id=2386&scope=make_payments%access_friends&response_type=code");
});

app.listen(process.env.PORT || 3000);

