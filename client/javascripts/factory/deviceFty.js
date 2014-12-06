'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	
	return function(){
		
		return {
			'get': function( data ){
				window.fdasAndroid.get = function(){
				};
			},	
			'set': function( data ){
				window.fdasAndroid.set( data );
			}
		};
	};
})