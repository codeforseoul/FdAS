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
						
			Auth.$promise.then( function( result ){

				if ( result.user ){
					auth = angular.copy( result.user );
					_deferred ? _deferred.resolve( result.user ) : undefined;
				} else {
					_deferred ? _deferred.reject() : undefined;
				}
			});
			Auth.$promise.catch( function(){
				_deferred ? _deferred.reject() : undefined;
			});
		};

		function cookieAuth(){
			window.location.href = Define.serviceHost + '/auth/facebook';	
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
	}

	AuthService.$inject = [
		'$q',
		'$http',
		'Define',
		'ResourceService'
	];

	return AuthService;
});