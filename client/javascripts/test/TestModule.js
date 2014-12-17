'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	return angular.
		module( 'fdasApp.test', [ 'ngMockE2E' ] ).
		run( function( $httpBackend ){
			/*[ 'feed', 'service', 'reply', 'replies', 'grade', 'grades', 'service', 'template', 'findOne' ].forEach(function( elem ){
				var reg = new RegExp( elem );

				$httpBackend.whenGET( reg ).passThrough();
				$httpBackend.whenPOST( reg ).passThrough();
				$httpBackend.whenPUT( reg ).passThrough();
				$httpBackend.whenDELETE( reg ).passThrough();
			}); */

			/*$httpBackend.whenPOST( /login/ ).respond( function( method, url, data ){
				var data = angular.fromJson( data ),
					user = {};

				if ( data.sns && data.snsUid ){
					user._id = '5486c440b89d3d2b1d5017e4'
				}
				
				return [ 200, user, {} ];
			});*/
		});
});