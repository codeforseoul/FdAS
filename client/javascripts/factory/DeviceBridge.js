'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	
	function DefineBridge( StoreService ){
		
		return {
			'test': function(){
				console.log( 'test DeviceBridge' );
			},
			'isDevice': function(){
				return window.androidBridge ? true : false;
			},
			'alarmSetToDevice': function( isAlarm, isInit ){
				if ( window.androidBridge ){
					window.androidBridge.alarmSet( isAlarm === true ? 1 : 0, isInit === true ? 1 : 0 );
				}
			},
			'alarmSetFromDevice': function( data ){
				StoreService.save({
					appAlarm: data === "1" ? true : false
				});
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
			},
			'kakaoLoginToDevice': function(){
				if ( window.androidBridge ){
					window.androidBridge.kakaoLogin();
				}
			},
			'kakaoShareToDevice': function( name, caption, description, link, picture ){
				if ( window.androidBridge ){
					window.androidBridge.kakaoShare( 
						name, 
						(caption ? caption : ''), 
						(description ? description : ''), 
						(link ? link : '' ), 
						(picture ? picture : '' ) 
					);
				}
			},
		};
	};

	DefineBridge.$inject = [
		'StoreService'
	];

	return DefineBridge;
})