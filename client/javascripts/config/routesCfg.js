'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	// feed mine count
	function mineCnt( $q, $resource, $timeout, Restful ){
		var deferred = $q.defer();

		$timeout( function(){
			deferred.resolve( 100 );
		}, 1000 );

		return deferred.promise;	
	}

	mineCnt.$inject = [
		'$q', 
		'$resource', 
		'$timeout', 
		'Restful'
	];


	// feed list
	function feedList( $q, $route, $resource, $timeout, storageSvc, Restful ){
		var deferred = $q.defer();

		function myFeed(){
			var myScrap = storageSvc.get( 'myScrap' ),
				arr = [];

			myScrap.forEach( function( id, idx ){
				$timeout( function(){
					arr.push({
						"category": "female",
						"agency": "여성새일센터",
						"location": "서울시 서대문구",
						"addDate": "2014-11-20",
						"fixDate": "",
						"delDate": "",
						"startDate": "2014-11-20",
						"endDate": "",
						"url": "",
						"title": "테스트 글1",
						"body": "세계적인 공룡알 화석지로 주목받는 화성시 화석지를 찾아 1억년전 공룡들의 생태를 알아보고 주변 퇴적암에서 공룡알화석, 규화목 등을 찾아보기 안산시 시화호 갈대습지공원을 방문 수생식물을 이용한 자연정화처리 과정을 살펴보기를 할 수 있는 체험학습입니다.",
						"image": "A00.jpg"
					});

					if ( idx === myScrap.length - 1 ){
						deferred.resolve( arr );
					}
				}, 100 );
			})		
		}

		function defaultFeed(){
			$timeout( function(){
				var arr = [],
					tmp = {
						"category": "female",
						"agency": "여성새일센터",
						"location": "서울시 서대문구",
						"addDate": "2014-11-20",
						"fixDate": "",
						"delDate": "",
						"startDate": "2014-11-20",
						"endDate": "",
						"url": "",
						"title": "테스트 글1",
						"body": "세계적인 공룡알 화석지로 주목받는 화성시 화석지를 찾아 1억년전 공룡들의 생태를 알아보고 주변 퇴적암에서 공룡알화석, 규화목 등을 찾아보기 안산시 시화호 갈대습지공원을 방문 수생식물을 이용한 자연정화처리 과정을 살펴보기를 할 수 있는 체험학습입니다.",
						"image": "A00.jpg",
						'score': 3.5
					};

				var tmp1 = angular.extend( {}, tmp );
				tmp1.id = '123';
				tmp1.endDate = '2014-11-22';
				tmp1.body = tmp1.body + '구치훈';
				arr.push( tmp1 );

				var tmp2 = angular.extend( {}, tmp );
				tmp2.id = '124';
				tmp2.category = 'education';
				tmp2.endDate = '2014-12-05';
				arr.push( tmp2 );

				deferred.resolve( arr );
			}, 100 );
		}

		switch( $route.current.params.svc ){
			case 'my':
				myFeed();
				break;

			case 'mine':
				break;

			default:
				defaultFeed();
				break;			
		}

		return deferred.promise;
	}

	feedList.$inject = [
		'$q', 
		'$route',
		'$resource', 
		'$timeout', 
		'storageSvc',
		'Restful'
	];


	// feed item
	function feedItem( $q, $resource, $timeout, Restful ){
		var deferred = $q.defer();

		$timeout( function(){
			var tmp = {
				"category": "여성",
				"agency": "여성새일센터",
				"location": "서울시 서대문구",
				"addDate": "2014-11-20",
				"fixDate": "",
				"delDate": "",
				"startDate": "2014-11-20",
				"endDate": "",
				"url": "",
				"title": "테스트 글1",
				"body": "세계적인 공룡알 화석지로 주목받는 화성시 화석지를 찾아 1억년전 공룡들의 생태를 알아보고 주변 퇴적암에서 공룡알화석, 규화목 등을 찾아보기 안산시 시화호 갈대습지공원을 방문 수생식물을 이용한 자연정화처리 과정을 살펴보기를 할 수 있는 체험학습입니다.",
				"image": "A00.jpg",
				'score': 3.5
			};

			var tmp1 = angular.extend( {}, tmp );
			tmp1.id = '123';
			tmp1.endDate = '2014-11-22';
			tmp1.body = tmp1.body + '구치훈';

			deferred.resolve( tmp1 );
		}, 500 );

		return deferred.promise;
	}

	feedItem.$inject = [
		'$q', 
		'$resource', 
		'$timeout', 
		'Restful'
	];


	// reply
	function replyList( $q, $resource, $timeout, Restful ){
		var deferred = $q.defer();

		$timeout( function(){
			var tmp = {
				"category": "여성",
				"agency": "여성새일센터",
				"location": "서울시 서대문구",
				"addDate": "2014-11-20",
				"fixDate": "",
				"delDate": "",
				"startDate": "2014-11-20",
				"endDate": "",
				"url": "",
				"title": "테스트 글1",
				"body": "세계적인 공룡알 화석지로 주목받는 화성시 화석지를 찾아 1억년전 공룡들의 생태를 알아보고 주변 퇴적암에서 공룡알화석, 규화목 등을 찾아보기 안산시 시화호 갈대습지공원을 방문 수생식물을 이용한 자연정화처리 과정을 살펴보기를 할 수 있는 체험학습입니다.",
				"image": "A00.jpg"
			};

			var tmp1 = angular.extend( {}, tmp );
			tmp1.id = '123';
			tmp1.endDate = '2014-11-22';
			tmp1.body = tmp1.body + '구치훈';

			deferred.resolve( tmp );
		}, 500 );

		return deferred.promise;
	}

	replyList.$inject = [
		'$q', 
		'$resource', 
		'$timeout', 
		'Restful'
	];


	// route
	function routesConfig( $routeProvider ){
		$routeProvider.
			when( '/intro', {
				'templateUrl': 'template/intro.html',
				'controller': 'introCtrl'
			}).
			when( '/my', {
				'templateUrl': 'template/my.html',
				'controller': 'myCtrl',
				'resolve': {
					'mineCnt': mineCnt
				}
			}).
			when( '/my/info', {
				'templateUrl': 'template/my-info.html',
				'controller': 'myInfoCtrl'
			}).
			when( '/category', {
				'templateUrl': 'template/category.html',
				'controller': 'categoryCtrl'
			}).
			when( '/app/setting', {
				'templateUrl': 'template/app-setting.html',
				'controller': 'appSettingCtrl'
			}).
			when( '/app/introduce', {
				'templateUrl': 'template/app-introduce.html',
				'controller': 'appIntroduceCtrl'
			}).
			when( '/feeds/:svc?', {
				'templateUrl': 'template/feed-list.html',
				'controller': 'feedListCtrl',
				'resolve': {
					'feedList': feedList
				}
			}).
			when( '/feed/:feedId', {
				'templateUrl': 'template/feed-item.html',
				'controller': 'feedItemCtrl',
				'resolve': {
					'feedItem': feedItem,
					'replyList': replyList
				}
			}).
			when( '/create/feed', {
				'templateUrl': 'template/feed-form.html',
				'controller': 'feedCreateCtrl'
			}).
			when( '/404', {
				'templateUrl': 'template/404.html'
			}).
			otherwise({
				'redirectTo': '/404'
			});
	}

	routesConfig.$inject = [
		'$routeProvider'
	];

	return routesConfig;
});