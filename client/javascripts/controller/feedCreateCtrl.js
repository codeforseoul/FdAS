'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function feedCreateCtrl( $scope, Define ){
		$scope.categories = Define.categories;
		$scope.location = Define.location;

		$scope.previewImage = function(){
			var reader = new FileReader();

			console.log( $scope )
			console.log( $scope.image )

			reader.readAsDataURL(  );
		}
	}

	feedCreateCtrl.$inject = [
		'$scope', 
		'Define'
	];

	return feedCreateCtrl;
});