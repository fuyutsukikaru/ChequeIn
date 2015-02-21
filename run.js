var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require('request');

var urlencodedParser = parser.urlencoded({ extended: false });

app.use(express.static(__dirname));

function loginToVenmo() {
  request.get("https://api.venmo.com/v1/oauth/authorize?client_id=2386&scope=make_payments%20access_profile%20access_friends&response_type=code", function(err, resp, body) {
    resp.write(body);
  });
}

app.post('/login', urlencodedParser, function(req, res) {
  // Handle login via Venmo here
  console.log("Handling login now");
 });

app.listen(process.env.PORT || 3000);

