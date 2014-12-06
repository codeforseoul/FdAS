'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function categoryCtrl( $scope, Define, storageSvc ){
		var myCategories = storageSvc.get( 'myCategories' );

		$scope.categories = Define.categories;

		$scope.save = function(){
			var activeCategories = $scope.categories.filter( function( item ){
				return $scope.categories[ item.val ] === true;
			});

			// 최소 1개 미만 시, 상단 선택
			if ( activeCategories.length === 0 ){
				alert( '최소 1개 이상 선택하세요.' );
				$scope.categories[ Define.categories[ 0 ].val ] = true;
				activeCategories = $scope.categories.filter( function( item ){
					return $scope.categories[ item.val ] === true;
				});
			}

			// 활성값만 저장
			storageSvc.save({
				'myCategories': activeCategories
			});
		};

		// 빈값이면 전체선택을 기본으로
		if ( myCategories.length === 0 ){
			myCategories = Define.categories.map( function( item ){
				return item;
			});
		}

		myCategories.forEach( function( category ){
			$scope.categories[ category.val ] = true;
		});
	}

	categoryCtrl.$inject = [
		'$scope',
		'Define', 
		'storageSvc'
	];

	return categoryCtrl;
});