'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function mainCtrl( $scope, $location, Define, snsSvc ){

		$scope.onModal = {};
		$scope.isViewLoading = false;
		$scope.snsLogin = snsSvc.login;

		$scope.$on('$routeChangeStart', function() {
			$scope.isViewLoading = true;
		});
		$scope.$on('$routeChangeSuccess', function() {
			$scope.isViewLoading = false;
		});
		
		// 화면 이동
		$scope.moveLink = function( path ){
			$location.path( '/' + path );
		};

		// 이전 화면 이동
		$scope.backLink = function(){

			if ( window.location.host === Define.host ){
				window.history.back();
			}
		};
	}

	mainCtrl.$inject = [
		'$scope', 
		'$location', 
		'Define',
		'snsSvc' 
	];

	return mainCtrl;
});