'use strict';

/**
 * @author: blim(kkh975@naver.com)
 */

angular.
	module( 'fdasApp.common.service' ).
	constant( 'dbhost', 'http://localhost:27017' ).
	factory( 'LocalStore', [ function(){
		return {
			'getItem': function( key ){
				return localStorage.getItem.apply( localStorage, arguments );
			},
			'setItem': function( key, value ){
				localStorage.setItem.apply( localStorage, arguments );
			}
		};
	}]).
	factory( 'DbStore', [ '$resource', 'dbhost', function( $resource, dbhost ){
		// var feedResource = $resource( dbhost );
		
		// return feedResource;
		// return null;
	}]);