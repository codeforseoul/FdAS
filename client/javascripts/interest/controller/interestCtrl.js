'use strict';

/**
 * @author: blim(kkh975@naver.com)
 */

angular.
	module( 'fdasApp.interest.controller' ).
	constant( 'Interests', [
		{
			'name': 'female',
			'title': '여성'
		}, {
			'name': 'education',
			'title': '교육'
		}, {
			'name': 'safety',
			'title': '안전'
		}, {
			'name': 'health',
			'title': '건강'
		}, {
			'name': 'family',
			'title': '가족'
		}, {
			'name': 'economy',
			'title': '경제'
		}, {
			'name': 'employment',
			'title': '고용'
		}, {
			'name': 'life',
			'title': '생활환경'
		}
	]).
	factory( 'interestStore', [ 'LocalStore', function( LocalStore ){
		return {
			getItem: function(){
				var myInterests = LocalStore.getItem( 'myInterests' );

				if ( myInterests ){
					return myInterests.split( ',' );
				} else {
					return null;
				}
			},
			save: function( _$scope ){
				var interests = _$scope.interests,
					map = interests.map( function( item, idx, array ){
						return array[ item.name ] ? item.name : false;
					});

				LocalStore.setItem( 'myInterests', map.join( ',' ) );
			},
		};
	}]).
	controller( 'interestCtrl', [ '$scope', '$rootScope', 'Interests', 'interestStore', function( $scope, $rootScope, Interests, interestStore ){
		var interests = interestStore.getItem();

		function applyState(){
			interestStore.save( $scope );
				
			$rootScope.$broadcast( 'feeds:filter', {
				'interests': interests
			});
		}

		$scope.interests = Interests;

		// 관심사가 없으면 전체선택
		if ( interests === null ){
			interests = Interests.map( function( item ){
				return item.name;
			});
		}

		// 선택값만 체크 표현
		interests.forEach( function( name ){ 
			$scope.interests[ name ] = true;
		});

		applyState();
		$scope.change = applyState;
	}]);