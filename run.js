var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require('request');
var http = require('http');

app.use(express.static(__dirname));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var urlParser = parser.json();

var info = "";

app.get("/callback", function(req, res) {
  var code = req.query.code;
  request.post("https://api.venmo.com/v1/oauth/access_token?client_id=2386&code=" + code + "&client_secret=38vPZDCqWU5QcsGGz6VdCNgG6ntZGKug", function(request, response, body) {
    info = JSON.parse(body);
    res.render("search", {
      username: info.user.display_name
    });
  });
});

app.post("/location", urlParser, function(req, res) {
  //res.send(req.body);
  res.send("Latitude is " + req.body.latitude + " and Longitude is " + req.body.longitude);
});

app.listen(process.env.PORT || 3000);
