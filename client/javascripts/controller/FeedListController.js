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
			} else if ( $scope.service === 'mine' ){ // 내가 쓴 글
				arr.push({
					'userId': AuthService.isAuth() ? AuthService.getAuth().id : ''
				});	
			} else if ( $scope.service === 'scrap' ){ // 스크랩한 글
				arr.push({
					'id': {
						'inq': myScrap
					}
				});

				// 삭제된 자료 제외
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
		// $scope.feeds = [{
		// 	id: '1',
		// 	userID: '1',
		// 	category: "etc",
		// 	agency: 'bokjiro.go.kr',
		// 	location: 'seoul',
		// 	addDate: new Date().getTime(),
		// 	fixDate: new Date().getTime(),
		// 	delDate: '',
		// 	title: '노인생애체험센터운영',
		// 	body: '젊은 세대에게 노인의 일상생활을 직접 체험해 봄으로써 노인에 대한 인식 변화와 세대 간 이해의 폭 확대',
		// 	url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000051166&servNm=노인생애체험센터운영',
		// 	image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
		// }];
		$scope.service = $routeParams.svc;

		// feed action
		$scope.getList = getList;

		// feed action - event detact from MainController
		[ 'star', 'modify', 'remove' ].forEach( function( key, index ){
			$scope.$on( 'service.feed.' + key, function( e, data ){
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