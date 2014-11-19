'use strict';

/**
 * @author: blim(kkh975@naver.com)
 */

angular.
	module( 'fdasApp.feed.controller' ).
	config([ '$routeProvider', function( $routeProvider ){
		$routeProvider.
			when( '/feeds/:svc?', {
				'templateUrl': 'javascripts/feed/template/list.tmpl.html',
				'controller': 'feedListCtrl'
			}).
			when( '/feed/create', {
				'templateUrl': 'javascripts/feed/template/form.tmpl.html',
				'controller': 'feedCreateCtrl'
			}).
			when( '/feed/:feedId', {
				'templateUrl': 'javascripts/feed/template/item.tmpl.html',
				'controller': 'feedItemCtrl'	
			});
	}]).
	factory( 'Feed', [ 'DbStore', function( DbStore ){
		// 가상 데이터
		var feeds = [
			{
				'_id': 'A00',
				'type': 'A',
				'sort': '여성',
				'location': '서울시 강남구 삼성동',
				'author': '여성새일센터',
				'date': '2014.10.10',
				'title': '워킹맘을 위한 든든한 고용대책 테스트',
				'contents': '<p>지난해 6월에 발표한 고용률 70%의 핵심 과제는 여성고용률을 높이는 것 이었는데요. 직장어린이집 활성화, 시간선택제 일자리 활성화, 일하는 여성의 생애주기별 경력유지 지원 등의 정책을 추진했습니다. 지난해 6월에 발표한 고용률 70%의 핵심 과제는 여성고용률을 높이는 것 이었는데요. 직장어린이집 활성화, 시간선택제 일자리 활성화, 일하는 여성의 생애주기별 경력유지 지원 등의 정책을 추진했습니다.</p>',
				'images': [ 'A00.jpg', 'A01.jpt', 'A02.jpg' ],
				'likes': [ 'testid-A1', 'testid-A2', 'testid-A3' ],
				'views': [ 'testid-A4', 'testid-A5', 'testid-A6' ],
				'replys': [{
					'id': 'testid-A7',
					'date': '2014.10.01',
					'contents': '답변 테스트1'
				}, {
					'id': 'testid-A8',
					'date': '2014.10.02',
					'contents': '답변 테스트2'
				}, {
					'id': 'testid-A9',
					'date': '2014.10.03',
					'contents': '답변 테스트3'
				}],
				'grades': [{
					'id': 'testid-A10',
					'grade': 1
				}, {
					'id': 'testid-A11',
					'grade': 2
				}, {
					'id': 'testid-A12',
					'grade': 3
				}]
			}, {
				'_id': 'B00',
				'type': 'B',
				'sort': '경제',
				'location': '서울시',
				'author': '우리은행',
				'date': '2014.10.20',
				'title': '우리은행 어린이 경제교실 참가신청',
				'contents': '<p>테스트 내 꿈을 키워주는 저축 - 내 통장 만들기, 용돈 관리 방법을 배워보아요. 보드게임을 통해 배우는 용돈관리와 경제원리로 우리은행에서 어린이 경제교실 참가신청을 받습니다.</p>',
				'images': [ 'A00.jpg', 'A01.jpt', 'A02.jpg' ],
				'likes': [ 'testid-B1', 'testid-B2', 'testid-B3' ],
				'views': [ 'testid-B4', 'testid-B5', 'testid-B6' ],
				'replys': [{
					'id': 'testid-B7',
					'date': '2014.10.04',
					'contents': '답변 테스트1'
				}, {
					'id': 'testid-B8',
					'date': '2014.10.05',
					'contents': '답변 테스트2'
				}, {
					'id': 'testid-B9',
					'date': '2014.10.06',
					'contents': '답변 테스트3'
				}],
				'grades': [{
					'id': 'testid-B10',
					'grade': 3
				}, {
					'id': 'testid-B11',
					'grade': 4
				}, {
					'id': 'testid-B12',
					'grade': 5
				}]
			}, {
				'_id': 'C00',
				'type': 'C',
				'sort': '문구',
				'location': '서울시 서대문구',
				'author': '이영미',
				'date': '2014.10.30',
				'title': '서대문 자연사박물관 공룡알을 찾아라 체험',
				'contents': '<p>세계적인 공룡알 화석지로 주목받는 화성시 화석지를 찾아 1억년전 공룡들의 생태를 알아보고 주변 퇴적암에서 공룡알화석, 규화목 등을 찾아보기 안산시 시화호 갈대습지공원을 방문 수생식물을 이용한 자연정화처리 과정을 살펴보기를 할 수 있는 체험학습입니다.</p>',
				'images': [ 'A00.jpg', 'A01.jpt', 'A02.jpg' ],
				'likes': [ 'testid-C1', 'testid-C2', 'testid-C3' ],
				'views': [ 'testid-C4', 'testid-C5', 'testid-C6' ],
				'replys': [{
					'id': 'testid-C7',
					'date': '2014.10.07',
					'contents': '답변 테스트1'
				}, {
					'id': 'testid-C8',
					'date': '2014.10.08',
					'contents': '답변 테스트2'
				}, {
					'id': 'testid-C9',
					'date': '2014.10.09',
					'contents': '답변 테스트3'
				}],
				'grades': [{
					'id': 'testid-C10',
					'grade': 5
				}, {
					'id': 'testid-C11',
					'grade': 6
				}, {
					'id': 'testid-C12',
					'grade': 7
				}]
			}
		];

		return {
			'getList': function(){
				return feeds.map( function( _item ){
					var item = angular.extend( {}, _item ),
						grade = 0;

					item.likes = _item.likes.length;
					item.views = _item.views.length;
					item.replys = _item.replys.length;
					item.grades = _item.grades.reduce( function( prev, next ){
						return prev + next.grade;
					}, 0 ) / _item.grades.length;

					return item; 
				});
			},
			'get': function( _id ){
				var feed = feeds.filter( function( item ){
					return item._id === _id;
				});

				return feed[ 0 ];
			},
			'save': function( _$scope ){
				// TODO, 저장 전 변환하기

				feeds.push({
					'_id': 'D00',
					'type': 'C',
					'sort': '문구',
					'location': _$scope.feedArea,
					'author': _$scope.feedAuthor,
					'date': function(){
						var date = new Date(),
							yy = date.getFullYear(),
							mm = date.getMonth() + 1,
							dd = date.getDate();

						return yy + '.' + mm + '.' + dd;							
					},
					'title': _$scope.feedTitle,
					'contents': _$scope.feedContents,
					'images': [],
					'likes': [],
					'replys': [],
					'views': [],
					'grades': []
				});
			},
		};
	}]).
	controller( 'feedCtrl', [ '$scope', 'MyStore', 'Feed', function( $scope, MyStore, Feed ){
		$scope.feedFilter = function( keyword ){
			$scope.$emit( 'feeds:filter', {
				'keyword': keyword
			});
		};

		$scope.feedSave = function( _id ){
			var store = MyStore.get( 'myClipping' ),
				idx = store.indexOf( _id );

			if ( idx !== -1 ){
				store.splice( idx, 1 );
			} else {
				store.push( _id );
			}

			MyStore.save({
				'myClipping': store
			});
		};

		$scope.feedShare = function( _id ){
			// TODO
			alert( '공유하기' );
		};

		$scope.feedReply = function( _id ){
			// TODO
		}
	}]).
	controller( 'feedListCtrl', [ '$scope', '$rootScope', '$routeParams', '$filter', '$location', 'MyStore', 'Feed', function($scope, $rootScope, $routeParams, $filter, $location, MyStore, Feed ){
		
		// 전역, feeds filter event
		$rootScope.$on( 'feeds:filter', function( e, _condition ){

			// Feeds 
			if ( _condition.keyword ){
				$scope.feeds = $filter( 'filter' )( Feed.getList(), function( item ){
					var result = 
						( item.title.indexOf( _condition.keyword ) > -1 ) || 
						( item.contents.indexOf( _condition.keyword ) > -1 );

					return result;
				});
			}

			// My -> 저장한 소식
			if ( _condition._ids ){
				$scope.feeds = $filter( 'filter' )( Feed.getList(), function( item ){
					return _condition._ids.indexOf( item._id ) > -1;
				});
			}
		});

		$scope.feeds = Feed.getList();
		$scope.feedDetail = function( _id ){
			$location.path( '/feed/' + _id );
		};

		// My -> 저장한 소식
		if ( $routeParams.svc === 'my' ){
			$rootScope.$broadcast( 'feeds:filter', {
				'_ids': MyStore.get( 'myClipping' )
			});
		}
	}]).
	controller( 'feedItemCtrl', [ '$scope', '$routeParams', 'Feed', function( $scope, $routeParams, Feed ){
		$scope.feed = Feed.get( $routeParams.feedId );
	}]).
	controller( 'feedCreateCtrl', [ '$scope', 'Feed', function( $scope, Feed ){
		$scope.feedTitle = '';
		$scope.feedAuthor = '';
		$scope.feedArea = '';
		$scope.feedContents = '';
		$scope.feedImage = '';

		$scope.submit = function(){
			Feed.save( $scope );
		};

		$scope.save = function( _id ){
			$scope.$emit( 'feed:save', _id );
		};
	}]).
	run([ '$route', angular.noop ]);