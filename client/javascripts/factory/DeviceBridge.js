'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	
	return function(){
		
		return {
			'isDevice': function(){
				return window.androidBridge ? true : false;
			},
			'alarmSetToDevice': function( data ){
				if ( window.androidBridge ){
					window.androidBridge.alarmSet( data === true ? 1 : 0 );
				}
			}
		};
	};
})