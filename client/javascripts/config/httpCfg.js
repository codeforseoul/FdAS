'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function httpConfig( $httpProvider, Define ){
		$httpProvider.interceptors.push( function( $q, $location ){
			return {
				request: function( config ){
					// console.group( 'request' );
					// console.log( config );
					// console.groupEnd( 'request' );
					return config;
				},
				requestError: function( rejection ){
					// console.group( 'requestError' );
					// console.log( rejection );
					// console.groupEnd( 'requestError' );
					return $q.reject( rejection );
				},
				response: function( result ){
					// console.group( 'response' );
					// console.log( result );
					// console.groupEnd( 'response' );
					return result;
				},
				responseError: function( rejection ){
					// console.group( 'responseError' );
					// console.log( rejection );
					// console.groupEnd( 'responseError' );

					switch( rejection.status ){
						case 403:
							break;

						case 404:
							break;
					}

					return $q.reject( rejection );
				}
			};
		});
	}

	httpConfig.$inject = [
		'$httpProvider',
		'Define'
	];

	return httpConfig;
});