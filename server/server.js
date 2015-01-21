var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser');

// attempt to build the providers/passport config
var config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// boot scripts mount components like REST API
boot(app, __dirname);

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// The access token is only available after boot
app.use(loopback.token({
  model: app.models.accessToken
})); 

app.use( loopback.cookieParser(app.get('cookieSecret')));
app.use( loopback.session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true
}));

// passportConfigurator.setupModels({
//   userModel: app.models.user,
//   userIdentityModel: app.models.userIdentity,
//   userCredentialModel: app.models.userCredential
// });

// for (var s in config) {
//   var c = config[s];
//   c.session = c.session !== false;
//   passportConfigurator.configureProvider(s, c);
// }

// passport load
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// passport use
app.use(passport.initialize());
app.use(passport.session());

// passport init
passport.use( new FacebookStrategy({
    clientID: config[ 'facebook-login' ][ 'clientID' ],
    clientSecret: config[ 'facebook-login' ][ 'clientSecret' ],
    callbackURL: config[ 'facebook-login' ][ 'callbackURL' ]
}, function( accessToken, refreshToken, profile, done ){

    console.log( '+ facebook info ======' );
    console.log( accessToken );
    console.log( refreshToken );
    console.log( profile );
    console.log( '--------------' );

    // done 메서드에 전달된 정보가 세션에 저장    
    return done( null, profile );
}));

// auth restful api
app.get( '/auth/facebook', passport.authenticate('facebook') );
app.get( '/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#/success',
    failureRedirect: '/#/failure'
}), function( req, res ){
    console.log('--- from facebook ---');
    // user: req.session.passport.user || {}
});

app.get('/isauth', function (req, res, next) {
  res.json({
    user: req.user
  });
});

app.get( '/logout', function( req, res ){
    req.logout();
    res.redirect( '/' );
});

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client')));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
