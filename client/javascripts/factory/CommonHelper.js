'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	
	return function(){
		
		return {
			'getDefineArrType': function( val, arr ){
				var map = [];

				if ( !isNaN( val ) ){
					val = parseInt( val, 10 );
				}
				
				map = arr.filter( function( each ){
					return each.val === val;
				});

				return map.length > 0 ? map[ 0 ] : arr[ 0 ];
			},
			'getIndexOfDefineArr': function( val, arr, key ){
				var idx = arr.length;

				while( --idx > -1 ){
					if ( arr[ idx ][ key ] === val ){
						return idx;
					}
				}

				return -1;
			}	
		};
	};
})