var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require('request');
var http = require('http');

app.use(express.static(__dirname));
app.engline('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var info = "";

app.get("/callback", function(req, res) {
  console.log("Handling the response");
  var code = req.query.code;
  request.post("https://api.venmo.com/v1/oauth/access_token?client_id=2386&code=" + code + "&client_secret=38vPZDCqWU5QcsGGz6VdCNgG6ntZGKug", function(request, response, body) {
    info = JSON.parse(body);
    http.createServer(function (req, resp) {
      var body = 'redirecting';
      resp.writeHead(302, {
        'Content-Type': 'text/plain',
        'Location': 'http://chequein.herokuapp.com/search',
        'content-length': body.length
      });
      resp.end(body);
    });
    return;
  });
  return;
});

app.get('/', function(req, res) {
  res.render("/search", {
    username: info.user.display_name
  });
});

app.listen(process.env.PORT || 3000);

