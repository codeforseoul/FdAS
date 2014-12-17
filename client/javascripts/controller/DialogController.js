'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function DialogController( $scope, $http, $q, Define, SnsService ){
		$scope.on, 
		$scope.type, 
		$scope.data, 
		$scope.host = Define.host;

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

		// sns 로그인 버튼
		/*$scope.snsLogin = function( sns ){
			// var deferred = $q.defer(),
			// 	promise = deferred.promise;

			// $scope.$parent.login( sns, deferred );

			// promise.then( function(){
			// 	alert( '로그인 되었습니다.' );
			// }, function(){
			// 	alert( '로그인에 실패하였습니다.' );
			// }).finally( $scope.close );
			
			$http.
				get( 'http://' + Define.serviceHost + '/auth/' + sns ).
				success( function( data, status, header, config ){
					alert( '로그인 되었습니다.' );
				}).
				error( function(){
					alert( '로그인에 실패하였습니다.' );
				}).finally( $scope.close );
		};

		// sns 공유 버튼
		$scope.snsShare = function(){
			SnsService.share.apply( null, arguments );
			$scope.close();
		};*/
	}

	DialogController.$inject = [
		'$scope', 
		'$http',
		'$q', 
		'Define',
		'SnsService'
	];

	return DialogController;
});