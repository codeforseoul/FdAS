'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function AppSettingController( $scope, $q, StoreService, AuthService ){

		function getAuth(){
			var deferred = $q.defer(),
				promise = deferred.promise;

			AuthService.setAuth( deferred );
			promise.then( function( user ){
				$scope.login = true;
			});
			promise.catch( function(){
				$scope.login = false;
			});	
		}

		function cookieAuth(){
			AuthService.cookieAuth();
		}

		function removeAuth(){
			var deferred = $q.defer(),
				promise = deferred.promise;

			AuthService.removeAuth( deferred );
			promise.then( function( user ){
				$scope.login = false;
			});
			promise.catch( function(){
				$scope.login = true;
			});	
		}

		function setAuth(){

			if ( AuthService.isAuth() ){
				$scope.login = true;				
			} else {
				getAuth();	
			}
		}

		$scope.toggleAuth = function( e ){
			$scope.login ? removeAuth() : cookieAuth();
			e.preventDefault();
		};

		$scope.save = function(){
			var data = {};

			keys.forEach( function( key ){
				data[ key ] = $scope[ key ];
			});

			StoreService.save( data );

			alert( '저장되었습니다.' );
		};

		[ 'appAlarm' ].forEach( function( key ){
			$scope[ key ] = StoreService.get( key );
		});

		setAuth();
	}

	AppSettingController.$inject = [
		'$scope', 
		'$q',
		'StoreService',
		'AuthService'
	];

	return AppSettingController;
});