'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function appSettingCtrl( $scope, storageSvc ){
		var keys = [ 'appAlarm', 'snsFb' ];

		keys.forEach( function( key ){
			$scope[ key ] = storageSvc.get( key );
		});

		$scope.save = function(){
			var data = {};

			keys.forEach( function( key ){
				data[ key ] = $scope[ key ];
			});

			storageSvc.save( data );
		};
	}

	appSettingCtrl.$inject = [
		'$scope', 
		'storageSvc'
	];

	return appSettingCtrl;
});