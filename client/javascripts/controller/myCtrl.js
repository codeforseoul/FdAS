'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function myCtrl( $scope, storageSvc, mineCnt ){

		// common
		[ 'myName', 'myGender', 'myAge', 'myPic', 'myLocation', 'myChildren', 'myScrap' ].forEach( function( key ){
			$scope[ key ] = storageSvc.get( key );
		});

		// database
		$scope.mineCnt = mineCnt;
	}

	myCtrl.$inject = [
		'$scope', 
		'storageSvc',
		'mineCnt'
	];

	return myCtrl;
});