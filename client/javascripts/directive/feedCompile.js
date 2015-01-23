'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function feedCompile( $q, $filter, Define, CommonHelper, StoreService, ResourceService ){
		return {
			'templateUrl': '../../template/feed-temp.html',
			'restrict': 'A',
			'replace': false,
			'priority': 0,
			'transclude': false,
			'scope': {
				'feed': '=item',
				'type': '=type',
				'outer': '&'
			},
			'link': function( $scope, elem, attrs ){

				function isScrap( feedId ){
					return StoreService.get( 'myScrap' ).indexOf( feedId ) > -1
				}

				function setFeed( feedId ){
					var area_idx = CommonHelper.getIndexOfDefineArr( $scope.feed.area, Define.locations, 'label' ),
						category_idx = CommonHelper.getIndexOfDefineArr( $scope.feed.category, Define.categories, 'val' );

					$scope.feed.shareUrl = Define.serviceHost + '/#/feed/' + feedId;
					$scope.feed.isScrap = isScrap( feedId );
					$scope.feed.isEnd = ( $scope.feed.delDate !== '' ) || $filter( 'endDate' )( $scope.feed.endDate );
					$scope.feed.area = area_idx > -1 ? Define.locations[ area_idx ].label : Define.locations[ 0 ].label;
					$scope.feed.category = category_idx > -1 ? Define.categories[ category_idx ] : Define.categories[ Define.categories.length - 1 ];

					// get star
					ResourceService.feed.star.method.query({
						'filter': {
							'fields': {
								'star': true
							},
							'where': {
								'feedId': feedId
							}
						}
					}, function( result ){
						var len, sum;

						len = result.length;
						sum = 
							len === 0 ?  0 : 
							len === 1 ? result[ 0 ].star : result.reduce(function( prev, next, item ){

								if ( prev.star ){
									prev = prev.star
								}

								return parseInt( prev, 10 ) + parseInt( next.star, 10 );
							});

						$scope.feed.star = len === 0 ? 0 : Math.round( sum / len );
					});

					// get reply cnt
					ResourceService.feed.reply.count.get({
						'where': {
							'feedId': feedId
						}
					}, function( result ){
						$scope.feed.replyCnt = result.count;
					}, function(){
						$scope.feed.replyCnt = '-';
					});						
				}

				if ( $scope.feed && $scope.feed.id ){
					setFeed( $scope.feed.id );
				}

				$scope.feedScrap = function( feedId ){
					var myScrap = StoreService.get( 'myScrap' ),
						findIdx = myScrap.indexOf( feedId );

					if ( feedId ){

						if ( findIdx > -1 ){
							myScrap.splice( findIdx, 1 );
							StoreService.save({
								'myScrap': myScrap
							});
						} else {
							myScrap.push( feedId );
							StoreService.save({
								'myScrap': myScrap
							});
						}
					}

					$scope.feed.isScrap = isScrap( feedId );
				};

				$scope.$watch( 'feed', function( feed ){					
					if ( feed ){
						setFeed( feed.id );	
					}
				});
			}
		};	
	}

	feedCompile.$inject = [
		'$q', 
		'$filter',
		'Define', 
		'CommonHelper',
		'StoreService', 
		'ResourceService'
	];

	return feedCompile;
});