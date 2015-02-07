'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function MainController( $rootScope, $scope, $location, $route, $q, Define, StoreService, ResourceService, AuthService, DeviceBridge ){

		// 디바이스 접근 여부
		$rootScope.isDevice = DeviceBridge.isDevice();
		
		// 화면 이동
		$scope.moveLink = function( path ){
			$location.path( '/' + path );
		};

		// 화면 이동
		$scope.moveAuthLink = function( path ){

			if ( AuthService.isAuth() ){
				$location.path( '/' + path );	
			} else {
				$scope.$broadcast( 'dialog.login' );				
			}
		};
		
		// 화면 갱신
		$scope.reloadPage = function(){
			$route.reload();
		};

		// 이전 화면 이동
		$scope.backLink = function(){

			// if ( window.location.host === Define.host ){
				window.history.back();
			// }
		};

		$scope.$on( 'moveLink', function( e, data ){
			$scope.moveLink( data );
		});

		$scope.$on( 'moveAuthLink', function( e, data ){
			$scope.moveAuthLink( data );
		});

		$scope.$on( 'reloadPage', function( e ){
			$scope.reloadPage();
		});

		$scope.$on( 'backLink', function( e ){
			$scope.backLink();
		});

		$scope.$on( 'auth', function( e, type ){
			AuthService.cookieAuth( type );
		});

		// dialog gateway
		$scope.$on( 'dialog', function( e, name, data ){
			$scope.$broadcast( 'dialog.' + name, data );
		});

		// function in dialog gateway
		$scope.$on( 'service', function( e, name, data ){
			$scope.$broadcast( 'service.' + name, data );
		});
	}

	MainController.$inject = [
		'$rootScope',
		'$scope', 
		'$location', 
		'$route',
		'$q', 
		'Define',
		'StoreService',
		'ResourceService',
		'AuthService',
		'DeviceBridge'
	];

	return MainController;
});