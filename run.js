var express = require('express');
var app = express();

var request = require("request");

app.use(express.bodyParser());

app.post('/login', function(req, res) {
  // Handle login via Venmo here
  console.log("Handling login now");
});

app.listen(process.env.PORT || 3000);

request("https://api.venmo.com/v1/oauth/authorize?client_id=2386&scope=make_payments%access_friends&response_type=code", function(err, resp, body) {
  console.log(body);
}
