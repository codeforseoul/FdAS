'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function AppSettingController( $scope, $q, StoreService, AuthService, DeviceBridge ){

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

		$scope.toggleAuth = function( e, type ){
			$scope.login ? removeAuth() : AuthService.cookieAuth( type );
			e.preventDefault();
		};
		
		$scope.toggleAlarm = function( e ){
			$scope.appAlarm = !$scope.appAlarm;
			DeviceBridge.alarmSetToDevice( $scope.appAlarm );
			StoreService.save({
				appAlarm: $scope.appAlarm
			});
			e.preventDefault();
		};

		// get from storage and set device
		$scope.appAlarm = StoreService.get( 'appAlarm' );

		setAuth();
	}

	AppSettingController.$inject = [
		'$scope', 
		'$q',
		'StoreService',
		'AuthService',
		'DeviceBridge'
	];

	return AppSettingController;
});