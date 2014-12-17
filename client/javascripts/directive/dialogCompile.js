'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function dialogCompile(){
		return {
			'templateUrl': '../../template/dialog.html',
			'restrict': 'A',
			'replace': false,
			'transclude': true,
			'controller': 'DialogController',
			'link': function( scope, elem, attrs, ctrl ){
				// console.log('test');
				// console.log(ctrl);
			}
		};	
	}

	dialogCompile.$inject = [
	];

	return dialogCompile;
});