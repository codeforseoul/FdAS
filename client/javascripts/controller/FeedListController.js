'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function FeedListController( $scope, $routeParams, Define, StoreService, ResourceService, AuthService, FeedService ){
		var myLocation = StoreService.get( 'myLocation' ),
			myCategories = StoreService.get( 'myCategories' ),
			myScrap = StoreService.get( 'myScrap' ),
			feedListCnt = 0,
			feedNowPage = 0;

		function getConditionParam(){
			var arr = [],
				tarr = [];
			
			if ( $scope.keyword ){ // 검색어 입력
				arr = [{
					'body': {
						'like': $scope.keyword ? '%' + $scope.keyword + '%' : ''
					}
				}];
			} else if ( $routeParams.svc === 'mine' ){ // 내가 쓴 글
				arr.push({
					'userId': AuthService.getAuth().id
				});
			} else if ( $routeParams.svc === 'my' ){ // 스크랩한 글
				arr.push({
					'id': {
						'inq': myScrap
					}
				});

				// 삭제된 자료 제외 - TODO
				arr.push({
					'delDate': ''
				});
			} else {

				// 나의 셋팅 > 위치 설정시
				if ( myLocation.val && myLocation.val > 0 ){
					arr.push({
						'location': myLocation.label
					});
				}

				// 관심사 설정시
				if ( myCategories.length > 0 ){
					arr.push({
						'id': {
							'inq': myCategories
						}
					});
				}

				// 삭제된 자료 제외
				arr.push({
					'delDate': ''
				});
			}

			return arr.length > 1 ? {
				'and': arr
			} : arr.length === 1 ? arr[ 0 ] : {};
		}

		function getList(){
			ResourceService.feed.method.query({
				'filter': {
					'order': 'addDate DESC',
					'limit': Define.feedsLimit,
					'skip': feedNowPage * Define.feedsLimit,
					'where': getConditionParam()
				}
			}, function( result ) {
				$scope.feeds = $scope.feeds.concat( result );
				$scope.hasFeedList = feedListCnt > Define.feedsLimit * ++feedNowPage;
			});
		}

		function getListCount(){
			ResourceService.feed.count.get({
				'where': getConditionParam()
			}, function( result ){
				$scope.hasFeedList = ( feedListCnt = result.count ) > 0;
				getList();
			});
		}

		// search
		$scope.filterKeyword = function( e ){

			if ( e.keyCode === 13 ){
				$scope.feeds = [];
				getListCount();		
			}
		};

		// feed
		$scope.feeds = [];
		$scope.service = $routeParams.svc;

		// feed action
		$scope.getList = getList;

		// feed action
		[ 'scrap', 'star', 'modify', 'remove' ].forEach( function( key, index ){
			$scope.$on( 'service.feed.' + key, function( e, data ){
				console.log( data )
				FeedService[ key ].call( null, $scope, data );
			});
		});

		// get feed
		getListCount();
	}

	FeedListController.$inject = [
		'$scope', 
		'$routeParams',
		'Define',
		'StoreService',
		'ResourceService',
		'AuthService',
		'FeedService'
	];

	return FeedListController;
});