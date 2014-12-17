'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function imgCompile( $q ){
		return {
			'restrict': 'A',
			'template': '<img>',
			'replace': true,
			'priority': 1,
			'transclude': false,
			'scope': false,
			'link': function( scope, elem, attrs ){
				var canvas = document.createElement( 'canvas' ),
					ctx = canvas.getContext( '2d' ),
					img = new Image,
					deferred = $q.defer(); 

				img.onload = function(){
					canvas.width = img.width;
					canvas.height = img.height;
				 	ctx.drawImage( img, 0, 0 );
					deferred.resolve( canvas.toDataURL() );
				};
				img.onerror = function(){
					deferred.reject( attrs.imgCompileBase );
				};
				img.crossOrigin = 'Anonymous';
				img.src = attrs.imgCompile;

				deferred.promise.then( function( data ){
					elem.attr( 'src', data );
				}, function( data ){
					elem.attr( 'src', data );			
				});
			}
		};	
	}

	imgCompile.$inject = [
		'$q'
	];

	return imgCompile;
});