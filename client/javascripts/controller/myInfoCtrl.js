'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function myInfoCtrl( $scope, $filter, Define, storageSvc ){
		$scope.fields = [
			{
				'key': 'myGender',
				'label': '성별',
				'options': Define.gender
			}, {
				'key': 'myAge',
				'label': '나이',
				'options': $filter( 'rangeObj' )([], 50, 20, Define.subfix.age )
			}, {
				'key': 'myLocation',
				'label': '지역',
				'options': Define.location
			}, {
				'key': 'myChildren',
				'label': '자녀',
				'options': Define.children
			}
		];

		$scope.children = [
			{
				'key': 'child1',
				'label': '첫째 나이',
				'options': $filter( 'rangeObj' )([], 14, 0, Define.subfix.age )
			},
			{
				'key': 'child2',
				'label': '둘째 나이',
				'options': $filter( 'rangeObj' )([], 14, 0, Define.subfix.age )
			},
			{
				'key': 'child3',
				'label': '셋째 나이',
				'options': $filter( 'rangeObj' )([], 14, 0, Define.subfix.age )
			}
		];

		$scope.fields.forEach( function( item ){
			$scope.fields[ item.key ] = storageSvc.get( item.key );
		});

		$scope.children.forEach( function( item ){
			$scope.children[ item.key ] = storageSvc.get( item.key );
		});

		$scope.save = function(){
			var data = {};

			$scope.fields.forEach( function( item ){
				data[ item.key ] = 
					$scope.fields[ item.key ] && 
					$scope.fields[ item.key ].val ? $scope.fields[ item.key ] : null;
			});

			$scope.children.forEach( function( item, idx ){
				data[ item.key ] = 
					data[ 'myChildren' ] && data[ 'myChildren' ].val > 0 ? (
						$scope.children[ item.key ] &&
						$scope.children[ item.key ].val &&
						data[ 'myChildren' ].val > idx ? 
							$scope.children[ item.key ] : null ) : 
						null;
			});	

			storageSvc.save( data );
		};
	}

	myInfoCtrl.$inject = [
		'$scope',
		'$filter',
		'Define', 
		'storageSvc'
	];

	return myInfoCtrl;
});

/*
if ( data[ 'myChildren' ] && data[ 'myChildren' ].val > 0 ){
	$scope.children.forEach( function( item, idx ){
		data[ item.key ] = 
			data[ 'myChildren' ] && data[ 'myChildren' ].val > 0 ? (
				$scope.children[ item.key ] &&
				$scope.children[ item.key ].val &&
				data[ 'myChildren' ].val > idx ? 
					$scope.children[ item.key ] : null ) : null;
	});	
} else {
	$scope.children.forEach( function( item ){
		data[ item.key ] = null;
	});	
} */