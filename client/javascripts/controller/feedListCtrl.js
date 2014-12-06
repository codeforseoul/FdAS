'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function feedListCtrl( $scope, $routeParams, storageSvc, feedSvc, feedList ){
		var myCategories = storageSvc.get( 'myCategories' );

		$scope.header = {
			'name': 'fdas',
			'label': '서울의발견'
		};

		$scope.feeds = feedList;

		$scope.isFeedScrap = function( id ){
			return feedSvc.isFeedScrap( id );
		};

		$scope.feedScrap = function( id ){
			feedSvc.feedScrap( id );
		};

		$scope.feedShare = function( sns, id ){
			feedSvc.feedShare( sns, id );
		};
		
		$scope.feedRating = function( val, id ){
			feedSvc.feedRating( val, id );
		};
		
		$scope.createReply = function(){
			// $scope.reply
		};

		// $scope.filterKeyword = function( e ){

		// 	if ( e.keyCode === 13 ){
		// 		console.log( $scope.keyword );				
		// 	}
		// };

		// $scope.filterCategory = function( item ){
		// 	return myCategories.indexOf( item.category ) > -1;
		// };
	}

	feedListCtrl.$inject = [
		'$scope', 
		'$routeParams',
		'storageSvc',
		'feedSvc',
		'feedList'
	];

	return feedListCtrl;
});