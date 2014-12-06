'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	
	return function(){
		
		return {
			'getItem': function( key, forceType ){
				var val = localStorage.getItem.apply( localStorage, arguments );

				if ( val === 'null' || val === 'undefined' ){
					val = null;
				}
				if ( val === 'true' ){
					val = true;
				}
				if ( val === 'false' ){
					val = false;
				}
				if ( !forceType && /\d/g.test( val ) ){
					val = parseInt( val, 10 );
				}

				return val;
			},
			'setItem': function( key, value ){
				localStorage.setItem.apply( localStorage, arguments );
			},
			'removeItem': function( key ){
				localStorage.removeItem.apply( localStorage, arguments );
			}
		};
	};
})