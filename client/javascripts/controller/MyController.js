'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function MyController( $scope, $q, StoreService, ResourceService, AuthService ){

		// height
		angular.element( 'html, body, #bodyLy, #myLy' ).css( 'height', '100%' );

		// common
		[ 'myName', 'myGender', 'myAge', 'myPic', 'myLocation', 'myChildren', 'myScrap' ].forEach( function( key ){
			$scope[ key ] = StoreService.get( key );
		});

		// database
		AuthService.isAuth( $q.defer() ).promise.then( function( user ){
			ResourceService.feed.count.get({
				'where': {
					'userId': user.id
				}
			}, function( result ) {
				$scope.mineCnt = result.count;
			});
		}, function(){
			$scope.mineCnt = 0;
		});
	}

	MyController.$inject = [
		'$scope', 
		'$q',
		'StoreService',
		'ResourceService',
		'AuthService'
	];

	return MyController;
});