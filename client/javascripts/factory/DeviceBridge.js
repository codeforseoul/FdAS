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
			},
			'facebookLoginToDevice': function(){
				if ( window.androidBridge ){
					window.androidBridge.facebookLogin();
				}
			},
			'facebookShareToDevice': function( name, caption, description, link, picture ){
				if ( window.androidBridge ){
					window.androidBridge.facebookShare( 
						name, 
						(caption ? caption : ''), 
						(description ? description : ''), 
						(link ? link : '' ), 
						(picture ? picture : '' ) 
					);
				}
			}
		};
	};
})