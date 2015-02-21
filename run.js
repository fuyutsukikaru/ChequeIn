var express = require('express');
var app = express();
var parser = require('body-parser');

var request = require('request');

app.use(express.static(__dirname));

app.get("/callback?:code", function(req, res) {
  console.log(req.params.code);
});

app.listen(process.env.PORT || 3000);

