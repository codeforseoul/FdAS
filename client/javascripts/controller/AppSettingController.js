'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function AppSettingController( $scope, $q, StoreService, AuthService, DeviceBridge ){

		$scope.toggleAuth = function( e, type ){
			if ( ( $scope.facebookLogin && type === 'kakao' ) || 
				( $scope.kakaoLogin && type === 'facebook' ) ){
				alert( '이미 인증이 되었습니다.' );
			} else {
				if ( e.target.checked ){
					AuthService.delCookieAuth( type, $q.defer() ).promise.then( function(){
						e.target.checked = false;
					}, function(){
						alert( '실패하였습니다.' );
					});
				} else {
					AuthService.cookieAuth( type );
				}
			}

			e.preventDefault();
		};
		
		$scope.toggleAlarm = function( e ){
			$scope.appAlarm = !$scope.appAlarm; 
			e.target.checked = $scope.appAlarm; // mobile not working
			DeviceBridge.alarmSetToDevice( $scope.appAlarm );
			e.preventDefault();
		};

		// get from storage and set device
		$scope.appAlarm = StoreService.get( 'appAlarm' );

		AuthService.isAuth( $q.defer() ).promise.then( function( user ){
			$scope[ user.type + 'Login' ] = true;
		});
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