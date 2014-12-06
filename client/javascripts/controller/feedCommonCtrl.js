'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function feedCommonCtrl( $scope, $rootScope, storageSvc, feedSvc, feedList ){
	}

	feedCommonCtrl.$inject = [
		'$scope', 
		'$rootScope', 
		'storageSvc',
		'feedSvc',
		'feedList'
	];

	return feedCommonCtrl;
});