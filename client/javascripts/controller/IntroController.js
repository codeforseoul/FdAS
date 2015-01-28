'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function IntroController( $scope, Define, StoreService ){
		$scope.isMove = false;
		$scope.nowIndex = 0;
		$scope.direction = 'left';
		$scope.list = [
			'알뜰서울의발견: 환영합니다!',
			'알뜰해지기: 그동안 자주 놓쳤던 서울의 행정 서비스를 피드형태로 구독할 수 있습니다.',
			'참여하기: 나만 알고 있던 행정 서비스가 있나요? 꽁꽁 숨겨두지 말고 직접 시민들에게 알려주세요!',
			'공유하기: 지인들에게 행정 서비스 정보를 공유하고 싶다고요? SNS연동으로 친구들에게 정보를 공유할 수 있습니다.'
		];

		$scope.prevSlide = function(){

			if ( $scope.isMove ){
				return false;
			}

			if ( $scope.nowIndex > 0 ){
				$scope.nowIndex--;
				$scope.direction = 'right';
			}

			setTimeout( function(){
				$scope.isMove = false;

				if ( $scope.nowIndex === 0 ){
					$scope.direction = 'left';
				}
			}, Define.introSwipeTime );
		};

		$scope.nextSlide = function(){
			
			if ( $scope.isMove ){
				return false;
			}

			if ( $scope.nowIndex < $scope.list.length - 1 ){
				$scope.nowIndex++;
				$scope.direction = 'left';
			}

			setTimeout( function(){
				$scope.isMove = false;

				if ( $scope.nowIndex === $scope.list.length - 1 ){
					$scope.direction = 'right';
				}
			}, Define.introSwipeTime );
		};

		// just once run
		if ( StoreService.get( 'isAppInit' ) ){
			$scope.$emit( 'moveLink', 'feeds' );
		} else {
			angular.element( 'html, body, #bodyLy' ).css( 'height', '100%' );
			StoreService.save({
				'isAppInit': true
			});
		}
	}

	IntroController.$inject = [
		'$scope',
		'Define',
		'StoreService'
	];

	return IntroController;
});