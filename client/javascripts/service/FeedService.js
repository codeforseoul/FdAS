'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function FeedService( $q, Define, StoreService, ResourceService, AuthService ){

		this.scrap = function( $scope, data ){
			var myScrap = StoreService.get( 'myScrap' ),
				findIdx = myScrap.indexOf( data );

			if ( data ){

				if ( findIdx > -1 ){
					myScrap.splice( findIdx, 1 );
					StoreService.save({
						'myScrap': myScrap
					});
				} else {
					myScrap.push( data );
					StoreService.save({
						'myScrap': myScrap
					});
				}
			}
		};

		this.modify = function( $scope, data ){
			var feedId  = data[ 0 ],
				userId = data[ 1 ],
				user = null;

			if ( AuthService.isAuth() ){
				user = AuthService.getAuth();

				if ( user.id === userId ){
					$scope.$emit( 'moveLink', 'update/feed/' + feedId );	
					$scope.$emit( 'dialog', 'close' );
				} else {
					alert( '죄송합니다. 권한이 없습니다.' );
					$scope.$emit( 'dialog', 'close' );
				}
			} else {
				$scope.$emit( 'dialog', 'login' );
			}
		};

		this.remove = function( $scope, data ){
			var feedId = data[ 0 ],
				userId = data[ 1 ],
				deferred = null,
				check = null,
				user = null;

			if ( AuthService.isAuth() ){
				check = confirm( "정말로 삭제하시겠습니까?" );

				if ( check === true ){
					user = AuthService.getAuth();

					if ( user.id === userId ){
						deferred = ResourceService.feed.item.delete({
							'id': feedId,
							'where': {
								'and': [{
									'userId': user.id
								}, {
									'feedId': feedId
								}]
							}
						}, {
							'delDate': new Date().getTime() + ''
						});

						deferred.$promise.then( function(){
							alert( '삭제되었습니다.' );
							$scope.$emit( 'reloadPage' );	
						});

						deferred.$promise.catch( function(){
							alert( '죄송합니다. 삭제에 실패하였습니다.' );
						});

						deferred.$promise.finally( function(){
							$scope.$emit( 'dialog', 'close' );
						});
					} else {
						alert( '죄송합니다. 권한이 없습니다.' );
						$scope.$emit( 'dialog', 'close' );
					}
				} else {
					$scope.$emit( 'dialog', 'close' );					
				}
			} else {
				$scope.$emit( 'dialog', 'login' );				
			}
		};

		this.star = function( $scope, data ){
			var star = data[ 0 ], 
				feedId = data[ 1 ],
				deferred = null,
				user = null;

			if ( AuthService.isAuth() ){
				user = AuthService.getAuth();
				deferred = ResourceService.feed.star.method.query({
					'filter':{
						'limit': 1,
						'where': {
							'and': [{
								'userId': user.id
							}, {
								'feedId': feedId
							}]
						}
					}	
				});

				deferred.$promise.then( function( result ){
					var date = new Date().getTime() + '';

					if ( result.length === 0 ){ // new
						ResourceService.feed.star.item.save({
							'userId': user.id,
							'feedId': feedId,
							'addDate': date,
							'star': star
						}, function(){
							alert( '반영되었습니다.' );
							$scope.$emit( 'reloadPage' );
							$scope.$emit( 'dialog', 'close' );	
						}, function(){
							alert( '반영에 실패하였습니다.' );	
							$scope.$emit( 'dialog', 'close' );						
						});
					} else {
						ResourceService.feed.star.item.update({
							'id': result[ 0 ].id
						}, {
							'fixDate': date,
							'star': star
						}, function(){
							alert( '반영되었습니다.' );
							$scope.$emit( 'reloadPage' );
							$scope.$emit( 'dialog', 'close' );	
						}, function(){
							alert( '반영에 실패하였습니다.' );	
							$scope.$emit( 'dialog', 'close' );						
						});
					}
				});

				deferred.$promise.catch( function(){
					alert( '죄송합니다. 등록에 실패하였습니다.' );
				});

				deferred.$promise.finally( function(){
					$scope.$emit( 'dialog', 'close' );
				});
			} else {
				$scope.$emit( 'dialog', 'login' );
			}
		};
	}

	FeedService.$inject = [
		'$q', 
		'Define',
		'StoreService',
		'ResourceService',
		'AuthService'
	];

	return FeedService;
});