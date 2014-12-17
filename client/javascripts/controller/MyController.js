'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function MyController( $scope, StoreService, ResourceService, AuthService ){

		// common
		[ 'myName', 'myGender', 'myAge', 'myPic', 'myLocation', 'myChildren', 'myScrap' ].forEach( function( key ){
			$scope[ key ] = StoreService.get( key );
		});

		// database
		if ( AuthService.isAuth() ) {
			ResourceService.feed.count.get({
				'where': {
					'userId': AuthService.getAuth().id
				}
			}, function( result ) {
				$scope.mineCnt = result.count;
			});
		}
	}

	MyController.$inject = [
		'$scope', 
		'StoreService',
		'ResourceService',
		'AuthService'
	];

	return MyController;
});