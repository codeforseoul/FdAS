'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function MainController( $rootScope, $scope, $location, $route, $q, Define, StoreService, ResourceService, AuthService ){
		
		// 화면 이동
		$scope.moveLink = function( path ){
			$location.path( '/' + path );
		};

		// 화면 이동
		$scope.moveAuthLink = function( path, successCallback, failureCallback ){
			AuthService.isAuth( $q.defer() ).promise.then( function( user ){
				successCallback ? successCallback() : $location.path( '/' + path );	
			}, function(){
				failureCallback ? failureCallback() : $scope.$broadcast( 'dialog.login' );
			});
		};
		
		// 화면 갱신
		$scope.reloadPage = function(){
			$route.reload();
		};

		// 이전 화면 이동
		$scope.backLink = function(){
			window.history.back();
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
		'AuthService'
	];

	return MainController;
});