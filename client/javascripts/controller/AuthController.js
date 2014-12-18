'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function AppSettingController( $scope, $q, AuthService ){
		var deferred = $q.defer(),
			promise = deferred.promise;

		AuthService.setAuth( deferred );

		promise.then( function(){
			alert( '성공하였습니다.' );
		});
		promise.catch( function(){
			alert( '실패하였습니다.' );
		});
		promise.finally( function(){
			$scope.$emit( 'moveLink', 'feeds' );
		});
	}

	AppSettingController.$inject = [
		'$scope',
		'$q',
		'AuthService'
	];

	return AppSettingController;
});