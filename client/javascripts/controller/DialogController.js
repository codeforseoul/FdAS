'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function DialogController( $scope, $http, $q, Define, AuthService, SnsService ){
		$scope.on, 
		$scope.type, 
		$scope.data;

		// dialog open
		$scope.open = function(){
			$scope.on = true;
			$scope.type = arguments[ 0 ];
			$scope.data = arguments.length > 1 ? arguments[ 1 ] : null;
			$scope.html = arguments.length > 2 ? arguments[ 2 ] : null;
		};

		// dialog close
		$scope.close = function(){
			$scope.on = false;
			$scope.type = null;
			$scope.data = null;
		};
		
		// dialog channel
		$scope.$on( 'dialog.close', function( e ){
			$scope.close();
		});

		$scope.$on( 'dialog.login', function( e ){
			$scope.open( 'login' );
		});

		$scope.$on( 'dialog.share', function( e, data ){
			$scope.open( 'share', data );
		});

		$scope.$on( 'dialog.shareCopy', function( e, data ){
			$scope.open( 'shareCopy', data );
		});

		$scope.$on( 'dialog.template', function( e, data, html ){
			$scope.open( 'template', data, html );
		});

		$scope.$on( 'dialog.star', function( e, data ){
			$scope.open( 'star', data );
		});

		$scope.$on( 'dialog.feedOption', function( e, data ){
			$scope.open( 'feedOption', data );
		});

		this.open = $scope.open;
		this.close = $scope.close;

		// sns login
		$scope.snsLogin = function( sns ){
			AuthService.cookie();
		};

		// sns share
		$scope.snsShare = function(){
			SnsService.share.apply( null, arguments );
			$scope.close();
		};
	}

	DialogController.$inject = [
		'$scope', 
		'$http',
		'$q', 
		'Define',
		'AuthService',
		'SnsService'
	];

	return DialogController;
});