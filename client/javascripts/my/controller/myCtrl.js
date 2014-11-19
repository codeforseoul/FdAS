'use strict';

/**
 * @author: blim(kkh975@naver.com)
 */

angular.
	module( 'fdasApp.my.controller' ).
	constant( 'Areas', [
		{ 
			'name': '00', 
			'title': '전체' 
		}, { 
			'name': '01', 
			'title': '종로구' 
		}, { 
			'name': '02', 
			'title': '중구' 
		}, { 
			'name': '03', 
			'title': '용산구' 
		}, { 
			'name': '04', 
			'title': '성동구' 
		}, { 
			'name': '05', 
			'title': '광진구' 
		}, { 
			'name': '06', 
			'title': '동대문구' 
		}, { 
			'name': '07', 
			'title': '중랑구' 
		}, { 
			'name': '08', 
			'title': '성북구' 
		}, { 
			'name': '09', 
			'title': '강북구' 
		}, { 
			'name': '10', 
			'title': '도봉구' 
		}, { 
			'name': '11', 
			'title': '노원구' 
		}, { 
			'name': '12', 
			'title': '은평구' 
		}, { 
			'name': '13', 
			'title': '서대문구' 
		}, { 
			'name': '14', 
			'title': '마포구' 
		}, { 
			'name': '15', 
			'title': '양천구' 
		}, { 
			'name': '16', 
			'title': '강서구' 
		}, { 
			'name': '17', 
			'title': '구로구' 
		}, { 
			'name': '18', 
			'title': '금천구' 
		}, { 
			'name': '19', 
			'title': '영등포구' 
		}, { 
			'name': '20', 
			'title': '동작구' 
		}, { 
			'name': '21', 
			'title': '관악구' 
		}, { 
			'name': '22', 
			'title': '서초구' 
		}, { 
			'name': '23', 
			'title': '강남구' 
		}, { 
			'name': '24', 
			'title': '송파구' 
		}, { 
			'name': '25', 
			'title': '강동구' 
		}
	]).
	factory( 'MyStore', [ 'LocalStore', 'Areas', function( LocalStore, Areas ){
		return {
			get: function( _key ){
				var keys = [ 'myGender', 'myAge', 'myArea', 'myClipping' ],
					idx = keys.length,
					key = '',
					tmp = null;

				while( --idx > -1 ){
					key = keys[ idx ];

					switch( key ){
						case 'myArea':
							tmp = LocalStore.getItem( key );
							return tmp ? tmp : Areas[ 0 ].name;
						case 'myClipping':
							tmp = LocalStore.getItem( key );
							return tmp ? tmp.split( ',' ) : [];
						default:
							return LocalStore.getItem( key );
					}
				}
			},
			save: function( _data ){	
				var keys = [ 'myGender', 'myAge', 'myArea', 'myClipping' ],
					idx = keys.length,
					key = '',
					val = '';

				while( --idx > -1 ){
					key = keys[ idx ];
					val = _data[ key ];

					if ( val ){
						switch( key ){
							case 'myArea':
								LocalStore.setItem( key, val.name );
								break;
							case 'myClipping':
								LocalStore.setItem( key, val.join( ',' ) );
								break;
							default:
								LocalStore.setItem( key, val );
								break;
						}
					}
				}
			}
		};
	}]).
	factory( 'AppStore', [ 'LocalStore', function( LocalStore ){
		return {
			get: function( _key ){

				if ( _key === 'appUpdate' ){
					return LocalStore.getItem( 'appUpdate' ) === 'true' ? true : false;
				}

				if ( _key === 'appAlarm' ){
					return LocalStore.getItem( 'appAlarm' ) === 'true' ? true : false;
				}
			},
			save: function( _$scope ){
				LocalStore.setItem( 'appUpdate', _$scope.appUpdate );
				LocalStore.setItem( 'appAlarm', _$scope.appAlarm );
			},
		};
	}]).
	controller( 'myCtrl', [ '$scope', '$location', function( $scope, $location ){

		// 화면 설정
		function setTemplate( path ){
			switch( path ){
				case '/my/info':
					$scope.isDefaultUrl = false;
					$scope.templateUrl = 'javascripts/my/template/my-info.html';
					break;
				case '/app/setting':
					$scope.isDefaultUrl = false;
					$scope.templateUrl = 'javascripts/my/template/app-setting.html';
					break;
				case '/my':
					$scope.isDefaultUrl = true;
					break;
				default:
					$scope.isDefaultUrl = true;
			}
		};

		// 화면 설정
		$scope.loadView = function( e ){
			var path = ( e.target || e.srcElement ).pathname;

			$location.path( path );
			setTemplate( path );
			e.preventDefault();
		};

		setTemplate( $location.path() );
	}]).
	controller( 'myInfoCtrl', [ '$scope', '$rootScope', 'Areas', 'MyStore', function( $scope, $rootScope, Areas, MyStore ){
		var myGender = MyStore.get( 'myGender' ),
			myAge = MyStore.get( 'myAge' ),
			myArea = MyStore.get( 'myArea' );

		function applyState(){
			var data = {
				'myGender': $scope.myGender,
				'myAge': $scope.myAge,
				'myArea': $scope.myArea
			};

			MyStore.save( data );
			$rootScope.$broadcast( 'feeds:filter', data );
		}

		// name(string)값을 다시 객체로 변환
		myArea = Areas.filter( function( item ){
			return item.name === myArea;
		})[ 0 ];

		$scope.areas = Areas;
		$scope.myGender = myGender;
		$scope.myAge = myAge;
		$scope.myArea = myArea;
		
		applyState();
		$scope.change = applyState;
	}]).
	controller( 'appSettingCtrl',  [ '$scope', 'AppStore', function( $scope, AppStore ){
		var appUpdate = AppStore.get( 'appUpdate' ),
			appAlarm = AppStore.get( 'appAlarm' );

		function applyState(){
			AppStore.save({
				'appUpdate': $scope.appUpdate,
				'appAlarm': $scope.appAlarm
			});
		}

		$scope.appUpdate = appUpdate === null ? true : appUpdate;
		$scope.appAlarm = appAlarm === null ? true : appAlarm;

		applyState();
		$scope.change = applyState;
	}]);