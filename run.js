var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require('request');

app.use(express.static(__dirname));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var info = "";

app.get("/callback", function(req, res) {
  console.log("Handling the response");
  var code = req.query.code;
  request.post("https://api.venmo.com/v1/oauth/access_token?client_id=2386&code=" + code + "&client_secret=38vPZDCqWU5QcsGGz6VdCNgG6ntZGKug", function(request, response, body) {
    info = JSON.parse(body);
    res.send("GET request to index");
  });
});

app.get('/', function(req, res) {
  return res.render("/search", {
    username = info.user.display_name
  });
});

app.listen(process.env.PORT || 3000);

