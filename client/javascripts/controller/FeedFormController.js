'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function FeedFormController( $scope, $location, $routeParams, $filter, Define, ResourceService, AuthService, CommonHelper ){
		var feedId = null,
			userId = null;

		function getData( userId ){
			var	ndate = new Date().getTime(),
			 	sdate = null,
				edate = null;

			sdate = $scope.startDate ? new Date( $scope.startDate ).getTime() : undefined;
			edate = $scope.endDate ? new Date( $scope.endDate ).getTime() : undefined;

			if ( edate && ( ndate > edate ) ){ // 종료날짜가 오늘 이후로만 고정
				edate = ndate;
			}
			if ( ( sdate && edate ) && ( sdate > edate ) ){ // 시작날짜가 최대값은 종료날짜로 고정
				sdate = edate;
			}
			if ( sdate ){
				sdate += '';
			}
			if ( edate ){
				edate += '';
			}

			return {				
				'userId': userId,
				'category': $scope.category.val,
				'agency': $scope.agency,
				'area': $scope.area.val,
				'startDate': sdate,
				'endDate': edate,
				'url': $scope.url ? $scope.url : '',
				'title': $scope.title,
				'body': $scope.body,
				'image': $scope.image	
			};
		}

		function commonSuccessCallback( type ){
			var check = confirm( type + '되었습니다. 바로 확인하시겠습니까?' );

			if ( check === true ){
				$scope.$parent.moveLink( 'feeds/mine' );
			} else {
				$scope.$parent.reloadPage();	
			}
		}

		function commonErrorCallback( type ){
			alert( '죄송합니다. ' + type + '에 실패하였습니다.' );	
		}

		$scope.isUpdate = $location.url().indexOf( 'update' ) > -1;
		$scope.categories = Define.categories;
		$scope.locations = Define.locations;

		if ( AuthService.isAuth() ){
			feedId = $routeParams.feedId;
			userId = AuthService.getAuth().id;

			if ( $scope.isUpdate ){
				ResourceService.feed.findOne.get({
					'filter': {
						'where': {
							'and': [{
								'userId': userId
							}, {
								'id': feedId							
							}]
						}
					}
				}, function( result ){
					// select options
					result.category = CommonHelper.getDefineArrType( result.category, Define.categories );
					result.area = CommonHelper.getDefineArrType( result.area, Define.locations );

					// date
					result.sdate = result.sdate ? $filter( 'date' )( result.sdate, 'yyyy-MM-dd' ) : null;
					result.edate = result.edate ? $filter( 'date' )( result.edate, 'yyyy-MM-dd' ) : null;

					[ 'category', 'title', 'body', 'area', 'startDate', 'endDate', 'image', 'agency', 'url' ].forEach( function( key ){
						$scope[ key ] = result[ key ];
					});
				}, function(){
					alert( '일치하는 데이터가 없습니다.' );
					$scope.$parent.backLink();				
				});
			} else {
				$scope.category = $scope.categories[ 0 ];
				$scope.area = $scope.locations[ 0 ];
			}
		} else {
			$scope.$emit( 'dialog', 'login' );
			$scope.$emit( 'backLink' );
		}

		// to form
		$scope.saveFeed = function(){

			if ( $scope.feedForm.$invalid ){
				alert( '입려 양식을 확인해주세요.' );
			}
		};

		// insert
		$scope.postFeed = function(){

			if ( AuthService.isAuth() ){
				var param = getData( userId );

				param.addDate = new Date().getTime() + '';
				param.fixDate = '';
				param.delDate = '';

				ResourceService.feed.method.save( param, function(){
					commonSuccessCallback( '등록' );
				}, function(){
					commonErrorCallback( '등록' );
				});
			} else {
				$scope.$emit( 'dialog', 'login' );
			}
		};

		// update
		$scope.putFeed = function(){

			if ( AuthService.isAuth() ){
				var param = getData( userId );

				param.fixDate = new Date().getTime();

				ResourceService.feed.item.update({
					 'id': feedId
				}, param, function(){
					commonSuccessCallback( '수정' );
				}, function(){
					commonErrorCallback( '수정' );
				});
			} else {
				$scope.$emit( 'dialog', 'login' );
			}
		};
	}

	FeedFormController.$inject = [
		'$scope', 
		'$location',
		'$routeParams',
		'$filter',
		'Define',
		'ResourceService',
		'AuthService',
		'CommonHelper'
	];

	return FeedFormController;
});



// category 
/*result.category = result.category ? Define.categories.filter( function( item ){
	return item.val === result.category;
}) : [];
result.category = result.category.length === 0 ? Define.categories[ 0 ] : result.category[ 0 ];

CommonHelper.getDefineArrType( result.category, Define.categories );

// area
result.area = result.area ? Define.locations.filter( function( item ){
	return item.val === result.area;
}) : [];
result.area = result.area.length === 0 ? Define.locations[ 0 ] : result.area[ 0 ];*/