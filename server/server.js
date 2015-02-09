var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

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

app.use(loopback.cookieParser(app.get('cookieSecret')));
app.use(loopback.session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true
}));
passportConfigurator.init();

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});

for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}

// TODO, 세션 있을시 정상적으로 json보내는지 확인 필요
// oauth 여부 
app.get('/isAuth', function (req, res, next) {
  if ( req.user ){
    res.json({
      user: req.user
    });
  } else {
    res.status( 403 ).send('not authorzied');
  }
});

// oauth 추가 by device
app.post('/auth/account/add', function (req, res, next) {
  // TODO, implements...
  // 디바이스 오는 정보를 DB에 밀어넣음
  // 쿠키&세션 추가해야 함..
  // 결과값: 
  //    성공: res.status(200).send('ok');
  //    실패: res.status(500).send('fail');
});

// redirect
app.get('/byPass', function(req, res, next){
  res.redirect(req.query.url);
});

// TODO, implements...
// push server
app.get('/pushkey/add', function(req, res, next){
  var device = req.query.device;
  var registrationId = req.query.registrationId;
  var appVersion = req.query.appVersion;

  // TODO, model 생성 안됨.
  var userModel = app.models.Pushkey || loopback.getModelByType(app.models.Pushkey);

  userModel.findOne({
    where: {
      registrationId: registrationId
    }
  }, function(err, item){
    if ( !item ){
      userModel.create({
        device: device,
        registrationId: registrationId,
        appVersion: appVersion,
        addDate: new Date().getTime()
      });
    }
  });
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
