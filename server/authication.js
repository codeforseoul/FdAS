
/* auth */
var jwt = require("jsonwebtoken");
var passport = require("passport");
var facebookStrategy = require("passport-facebook").Strategy;
var kakaoStrategy = require("passport-kakao").Strategy;

var server = require('./server');
var dataSource = server.dataSources.fdas_dev;
var User = server.models.user;


// AuthConfigurator
module.exports = AuthConfigurator;

// AuthConfigurator
function AuthConfigurator(app) {
	if (!(this instanceof AuthConfigurator)) {
		return new AuthConfigurator(app);
	}
	this.app = app;
}

// for token-base auth
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
	next();
});


// provider(facebook, kakao)에게 정보를 전달 받음
// 사용자 정보를 session에 저장
passport.serializeUser( function( user, done ){
	// 정보를 세션에 통쨰로 저장
	done( null, user );

	// loopback-passport 방식, 세션에 id만 저장
	// done( null, user.id );
});

// 세션에 저장된 값을 이용해서 user를 찾은 후, http request에 리턴
passport.deserializeUser( function( user, done ){
	done(null, user);

	// loopback-passport 방식, 접속때마다 DB를 읽음
	/*User.findById( id, function( err, user ){
		if (err || !user) {
			return done(err, user);
		}
		user.identities(function (err, identities) {
			user.profiles = identities;
			user.credentials(function (err, accounts) {
				user.accounts = accounts;
				done(err, user);
			});
		});
	});*/
});


// use facebook 
passport.use( new facebookStrategy({
	clientID: '493065400723583',
	clientSecret: '8b5dedfc560653fccb60341f685eca7f',
	callbackURL: "http://www.example.com/auth/facebook/callback"
}, function( accessToken, refreshToken, profile, done ){
	arguments.shift( 'facebook' );
	providerInfoSave.call( this, arguments );
}));


// use kakao
passport.use( new kakaoStrategy({
	clientID: '9d9f874de025cd65c3a39e2c54109daf',
	callbackURL: 'http://localhost:3000/oauth'
}, function( accessToken, refreshToken, profile, done ){
	arguments.shift( 'kakao' );
	providerInfoSave.call( this, arguments );
}));


// Redirect to Facebook for authentication.  When complete, Facebook will redirect the user back to the application at /auth/facebook/callback
// authorization code 와 callback url 값을 응답
app.get( '/auth/facebook', passport.authenticate( "facebook" ), function( req, res ){
});

// Facebook will redirect the user to this URL after approval
// AccessToken 유효 문의
app.get( '/auth/facebook/callback', {
}, function( req, res ){
});

// Kakao authentication
// authorization code 와 callback url 값을 응답
app.get('/auth/kakao', passport.authenticate('kakao'), function( req, res ){
});

// Kakao will redirect the user to this URL after approval
// AccessToken 유효 문의
app.get('/oauth', {
}, function( req, res ){	
});


/* provider */
function providerInfoSave(){
	var provider = arguments[ 0 ];
	var accessToken = arguments[ 1 ];
	var refreshToken = arguments[ 2 ];
	var profile = arguments[ 3 ];
	var done = arguments[ 4 ];

	User.findOne({
		provider: provider,
		username: profile.id
	}, function( err, user ){
		if ( err ){
			return done( err );
		} else {
			if( !user ){
				user = new User({
					name: profile.username,
					username: profile.id,
					roles : ['authenticated'],
					provider: provider,
					_json: profile._json,
					token: jwt.sign( user, process.env.JWT_SECRET )
				});

				user.save(function(err){
					if(err){
						console.log(err);
					}
					return done(err, user);
				});
			} else {
				done( null, user );				
			}
		}
	});	
}

/* token-base auth need */
app.post( '/api/*', ensureAuthorized );
app.put( '/api/*', ensureAuthorized );
app.delete( '/api/*', ensureAuthorized );

/* token-base auth */
function ensureAuthorized( req, res, next ){
	/*var bearerToken;
	var bearerHeader = req.headers["authorization"];

	if ( typeof bearerHeader !== 'undefined' ){
		var bearer = bearerHeader.split( " " );
		bearerToken = bearer[ 1 ];
		req.token = bearerToken;
		next();
	} else {
		res.send( 403 );
	}*/

	// passport에서 자동으로 세션정보 파악
	if ( req.isAuthenticated() ){
		// 넘기기전에 session에 있는 user.id 같은 값을 userId 값을 req태워서 보냄 
		// - 이런 방식으로 구현시, angular 수정!
		// e.g. req.params.userId = res.session.user.id
		return next(); 
	} else {
		res.send( 403 );
	}
}