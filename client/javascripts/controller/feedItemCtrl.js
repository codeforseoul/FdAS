'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function feedItemCtrl( $scope, $routeParams, feedSvc, feedItem, replyList ){
		$scope.header = {
			'name': 'fdas2',
			'label': '서울의발견'
		};

		$scope.feed = feedItem;

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
	}

	feedItemCtrl.$inject = [
		'$scope', 
		'$routeParams', 
		'feedSvc',
		'feedItem',
		'replyList'
	];

	return feedItemCtrl;
});