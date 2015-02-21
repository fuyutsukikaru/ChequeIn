var express = require('express');
var app = express();
var parser = require('body-parser');
var venmo = require('venmo');
var passport = require('passport');
var VenmoStrategy = require('passport-venmo').Strategy;

function loginToVenmo() {
  passport.use(new VenmoStrategy({
      clientID: "2386",
      clientSecret: "38vPZDCqWU5QcsGGz6VdCNgG6ntZGKug",
      callbackURL: "http://chequeit.herokuapp.com/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      /*User.findOrCreate({ VenmoId: profile.id }, function (err, user) {
        return done(err, user);
      });*/
      done(null, profile);
    }
  ));

  app.get('/auth/venmo', passport.authenticate('venmo'));

  app.get('/auth/venmo/callback', passport.authenticate('venmo', {
    failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
  });
}

var urlencodedParser = parser.urlencoded({ extended: false });

app.use(express.static(__dirname));

app.post('/login', urlencodedParser, function(req, res) {
  // Handle login via Venmo here
  console.log("Handling login now");
  //venmo = new Venmo(2386, 38vPZDCqWU5QcsGGz6VdCNgG6ntZGKug);
  loginToVenmo();
 });

app.listen(process.env.PORT || 3000);

