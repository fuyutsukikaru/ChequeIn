var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require('request');

app.use(express.static(__dirname));

var info = "";

app.get("/callback", function(req, res) {
  console.log("Handling the response");
  var code = req.query.code;
  request.post("https://api.venmo.com/v1/oauth/access_token?client_id=2386&code=" + code + "&client_secret=38vPZDCqWU5QcsGGz6VdCNgG6ntZGKug", function(req, res, body) {
    info = JSON.parse(body);
    res.render("/search", {
      username = info.user.display_name
    }
  });
});

app.listen(process.env.PORT || 3000);

