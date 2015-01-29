'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	
	return function(){
		
		return {
			'alarmGet': function( data ){
				window.androidBridge.alarmGet = function(){
				};
			},	
			'alarmSet': function( data ){
				console.log( data );

				if ( window.androidBridge ){
					window.androidBridge.alarmSet( data === true ? 1 : 0 );
				}
			}
		};
	};
})