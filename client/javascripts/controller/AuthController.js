'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function AppSettingController( AuthService ){
		AuthService.setAuth();

	}

	AppSettingController.$inject = [
		'$'
		'AuthService'
	];

	return AppSettingController;
});