'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function AuthService( $q, $http, Define, ResourceService ){
		var auth = {};

		function isAuth(){
			return JSON.stringify( getAuth() ) !== "{}";
		}

		function getAuth(){
			return auth;
		}

		function setAuth( _deferred ){
			var Auth = ResourceService.user.auth.get();
			
			// _deferred.resolve();
			// auth = { id: '82f0af104381453d298b6bfd62a2cb97' }
			
			Auth.$promise.then( function( result ){
				_deferred ? 
					( result.user ? _deferred.resolve( result.user ) : _deferred.reject() ) : 
					undefined;
				auth = angular.copy( result.user );
			});
			Auth.$promise.catch( function( result ){
				_deferred ? _deferred.reject() : undefined;
			});
		};

		function cookieAuth(){
			window.location.href = 'http://' + Define.serviceHost + '/auth/account?returnUrl=' + window.location.href;			
		}

		function removeAuth( _deferred ){
			var Auth = ResourceService.user.auth.get();

			Auth.$promise.then( function( result ){
				_deferred ? _deferred.resolve( result ) : undefined;
				auth = {};
			});
			Auth.$promise.catch( function( result ){
				_deferred ? _deferred.resolve( result ) : undefined;
				auth = {};
			});	
		}

		function loginChaining( _deferred ){

			if ( isAuth() ){
				_deferred ? _deferred.resolve( getAuth() ) : undefined;
			} else {
				_deferred ? _deferred.reject() : undefined;
			}
		};

		this.isAuth = isAuth;
		this.getAuth = getAuth;
		this.setAuth = setAuth;
		this.cookieAuth = cookieAuth;
		this.removeAuth = removeAuth;
		this.loginChaining = loginChaining;

		// this.getUser = getUser;
		// this.setUser = setUser;

		// function setAuth( _auth ){
		// 	auth = _auth;
		// }

		// function getAuth(){
		// 	return auth;
		// }

		// function setAuth( _auth ){
		// 	auth = _auth;
		// }

		// function doAuth( sns, snsUid, deferred ){
		// 	var sns = sns ? sns : StoreService.get( 'sns' ),
		// 		snsUid = snsUid ? snsUid: StoreService.get( 'snsUid' );

		// 	if ( sns && snsUid ){
		// 		ResourceService.user.findOne.get({
		// 			'where': {
		// 				'and': [{
		// 					'sns': sns
		// 				}, {
		// 					'snsUid': snsUid
		// 				}]
		// 			}
		// 		}, function( result ){

		// 			if ( result._id ) {
		// 				setAuth( true );
		// 				setUser({
		// 					'_id': result._id
		// 				});

		// 				console.log( 'route sns login success' );

		// 				deferred ? deferred.resolve() : null;
		// 			} else {
		// 				deferred ? deferred.reject( 'require join' ) : null;
		// 			}
		// 		}, function(){
		// 			deferred ? deferred.reject( 'error server' ) : null;
		// 		});
		// 	} else {
		// 		deferred ? deferred.reject( 'check parameters' ) : null;
		// 	}
		// }

		// function doSnsLogin( sns, deferred ){
		// 	var snsDeferred = $q.defer(),
		// 		snsPromise = snsDeferred.promise;

		// 	// get sns info
		// 	SnsService.login( sns, snsDeferred );

		// 	// after sns info
		// 	snsPromise.then( function( user ){
		// 		var findPromise = null,
		// 			joinDeferred = $q.defer(),
		// 			joinPromise = joinDeferred.promise;

		// 		findPromise = ResourceService.user.findOne.get({
		// 			'where': {
		// 				'and': [{
		// 					'sns': sns
		// 				}, {
		// 					'snsUid': user.id
		// 				}]
		// 			}
		// 		}, function( result ){

		// 			if ( result.snsUid ){
		// 				joinDeferred.resolve( result._id );
		// 			} else {
		// 				doSnsJoin( user, joinDeferred );
		// 			}
		// 		});

		// 		$q.all( findPromise, joinPromise ).then( function(){
		// 			StoreService.save({
		// 				'sns': sns,
		// 				'snsUid': user.id
		// 			});

		// 			doAuth( deferred );
		// 		}, function(){
		// 			deferred ? deferred.reject() : null;
		// 		});
		// 	}, function(){
		// 		deferred ? deferred.reject() : null;
		// 	});
		// };

		// function doSnsJoin( data, deferred ){
		// 	ResourceService.user.method.save({
		// 		'sns': 'facebook',
		// 		'snsUid': data.id,
		// 		'snsnsPics': data.pic,
		// 		'snsName': data.name,
		// 		'addDate': new Date().getTime()
		// 	}, function( result ){
		// 		deferred ? deferred.resolve() : null;
		// 	}, function(){
		// 		deferred ? deferred.reject() : null;
		// 	});	
		// };

		// function getUser(){
		// 	// return user;
		// 	return {
		// 		_id: "2"
		// 	};
		// }

		// function setUser( _user ){

		// 	if ( _user ){

		// 		for( var key in _user ){
		// 			user[ key ] = _user[ key ];
		// 		}
		// 	}
		// }
	}

	AuthService.$inject = [
		'$q',
		'$http',
		'Define',
		'ResourceService'
	];

	return AuthService;
});