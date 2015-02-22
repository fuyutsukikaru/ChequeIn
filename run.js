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

var locu = require('locu');
var locuClient = new locu.VenueClient("a260eae3274e2138b032191c58f63bc5f308b416");

app.use(express.static(__dirname));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var urlParser = parser.urlencoded({ extended: false });

var info = "";
var business;
var code;

app.get("/callback", function(req, res) {
  code = req.query.code;
  request.post("https://api.venmo.com/v1/oauth/access_token?client_id=2386&code=" + code + "&client_secret=38vPZDCqWU5QcsGGz6VdCNgG6ntZGKug", function(request, response, body) {
    info = JSON.parse(body);
    res.render("search");
  });
});

app.post("/location", urlParser, function(req, res) {
  yelp.search({term: "food", location: "Palo Alto", cll: req.body.latitude + "," + req.body.longitude, limit: 10, sort: 1, radius_filter: 5000}, function (err, data) {
    //console.log(data);
    business = data.businesses;
    //console.log(business);
    var total = data.total;
    var names = [];
    for (var i = 0; i < data.businesses.length; i++) {
      names.push(data.businesses[i].name);
    }
    res.render("location", {
      username: info.user.display_name,
      place: names
    });
  });
});

app.get("/place", function(req, res) {
  var id = req.query.id;
  locuClient.search({name: business[id].name, locality: 'Palo Alto'}, function(result) {
    request.get("https://api.venmo.com/v1/users/" + info.user.id + "/friends?access_token=" + code, function(request, response, body) {
      console.log(body);
      var friends = [];
      var friendsId = [];
      for (var i = 0; i < body.data.length; i++) {
        friends.push(body.data[i].display_name);
        friendsId.push(body.data[i].id);
      }
      res.render("place", {
        title: business[id].name,
        names: friends,
        ids: friendsId
      });
    });
  });
});

app.listen(process.env.PORT || 3000);
