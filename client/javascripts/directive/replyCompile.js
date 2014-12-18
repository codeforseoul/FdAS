'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function feedCompile( $q, $filter, Define, CommonHelper, StoreService, ResourceService ){
		return {
			'restrict': 'A',
			'replace': false,
			'priority': 0,
			'link': function( $scope, elem, attrs ){

				function setUserInfo( userId ){
					ResourceService.user.method.query({
						'filter': {
							'limit': 1,
							'where': {
								'id': userId
							}
						}						
					}, function( result ){

						if ( result.length > 0 ){
							result = result[ 0 ];
							result.email = result.email ? result.email.split( '@' )[ 0 ] : 'unKnow';
							$scope.reply.userName = result.email;
						} else {
							$scope.reply.userName = 'unKnow';
						}
					}, function(){
						$scope.reply.userName = 'unKnow';
					});						
				}

				if ( $scope.reply && $scope.reply.id ){
					setUserInfo( $scope.reply.userId );
				}

				$scope.$watch( 'reply', function( reply ){
					
					if ( reply ){
						setUserInfo( reply.userId );	
					}
				});
			}
		};	
	}

	feedCompile.$inject = [
		'$q', 
		'$filter',
		'Define', 
		'CommonHelper',
		'StoreService', 
		'ResourceService'
	];

	return feedCompile;
});