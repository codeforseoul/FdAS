'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function AuthService( $rootScope, $q, $http, Define, DeviceBridge, ResourceService ){
		// var auth = {};

		function isAuth( deferred ){
			if ( !deferred ){
				alert( 'check system parameter' );
			}
						
			ResourceService.user.isAuth.get({}, function( result ){
				deferred.resolve( result );
			}, function(){
				deferred.reject();
			});

			return deferred;
			// return JSON.stringify( getAuth() ) !== "{}";
		}

		/*function getAuth(){
			return auth;
		}*/

		/*function setAuth( _deferred ){
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
		};*/

		function cookieAuth( type ){
			if ( $rootScope.isDevice ){
				switch( type ){
					case 'facebook':
						DeviceBridge.facebookLoginToDevice();
						break;
					case 'kakaotalk':
						DeviceBridge.kakaoLoginToDevice();
						break;
				}
			} else {
				window.location.href = Define.serviceHost + '/auth/' + type;					
			}
		}

		function delCookieAuth( type, _deferred ){
			// TODO
			// 어떻게 뺄것인지 협의 필요
			/*ResourceService.user.auth.delAuth({
				'type': type
			}).$promise.then( function(){
				_deferred ? _deferred.resolve() : undefined;
			}, function(){
				_deferred ? _deferred.reject() : undefined;
			});*/

			return _deferred;
		}

		/*function removeAuth( _deferred ){
			var Auth = ResourceService.user.auth.get();

			Auth.$promise.then( function( result ){
				_deferred ? _deferred.resolve( result ) : undefined;
				auth = {};
			});
			Auth.$promise.catch( function( result ){
				_deferred ? _deferred.resolve( result ) : undefined;
				auth = {};
			});	
		}*/

		/*function loginChaining( _deferred ){
			if ( isAuth() ){
				_deferred ? _deferred.resolve( getAuth() ) : undefined;
			} else {
				_deferred ? _deferred.reject() : undefined;
			}
		};*/

		this.isAuth = isAuth;
		// this.getAuth = getAuth;
		// this.setAuth = setAuth;
		this.cookieAuth = cookieAuth;
		this.delCookieAuth = delCookieAuth;
		// this.removeAuth = removeAuth;
		// this.loginChaining = loginChaining;
	}

	AuthService.$inject = [
		'$rootScope',
		'$q',
		'$http',
		'Define',
		'DeviceBridge',
		'ResourceService'
	];

	return AuthService;
});