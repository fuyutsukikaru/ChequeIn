var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require('request');
var http = require('http');

var yelp = require('yelp').createClient({
  consumer_key: "U0hKoZQPvmVWslo6YNCOEQ",
  consumer_secret: "va2XCPgADbfUbfWERgLtrmwZwFs",
  token: "Lm5UZZMz9Tjrn8Er5gPmsuXoHzyUBaxb",
  token_secret: "5BYJp02m0i7m64xiKhYhlrlK0e0"
});

app.use(express.static(__dirname));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var urlParser = parser.urlencoded({ extended: false });

var info = "";

app.get("/callback", function(req, res) {
  var code = req.query.code;
  request.post("https://api.venmo.com/v1/oauth/access_token?client_id=2386&code=" + code + "&client_secret=38vPZDCqWU5QcsGGz6VdCNgG6ntZGKug", function(request, response, body) {
    info = JSON.parse(body);
    res.render("search");
  });
});

app.post("/location", urlParser, function(req, res) {
  //res.send(req.body);
  //res.send("Latitude is " + req.body.latitude + " and Longitude is " + req.body.longitude);
  /*res.render("location", {
    username: info.user.display_name
  });*/
  yelp.search({cll: req.body.latitude + "," + req.body.longitude}, function (err, data) {
    console.log(data);
  }
});

app.listen(process.env.PORT || 3000);
