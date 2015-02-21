var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require('request');

app.use(express.static(__dirname));

app.get("/callback", function(req, res) {
  console.log("Handling the response");
  console.log(req.param("code"));
});

app.listen(process.env.PORT || 3000);

