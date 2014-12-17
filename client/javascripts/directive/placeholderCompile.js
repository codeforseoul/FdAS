'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function placeholder(){
		return {
			'restrict': 'A',
			'replace': false,
			'priority': 0,
			'transclude': false,
			'scope': false,
			'link': function( scope, elem, attrs ){
				var qPlace = angular.element( '<p>' + attrs.placeholder + '</p>' );

				function qPlaceShow(){
					qPlace.css( 'display', 'block' );					
				}

				function qPlaceHide(){
					qPlace.css( 'display', 'none' );					
				}

				function qPlaceToggle( val ){
					!val || val === '' ? qPlaceShow() : qPlaceHide();	
					qPlace.attr( 'class', ( 'placeholder-dir ' + elem.attr( 'class' ) ) );	
				}

				qPlace.css({
					'position': 'absolute',
					'top': '0',
					'left': '0'
				});

				qPlace.on( 'click', function( e ){
					elem.triggerHandler( 'focus' );
				});

				elem.parent().css( 'position', 'relative' );
				elem.prop( 'placeholder', '' );
				elem.after( qPlace );

				elem.on( 'focus', function(){
					qPlaceHide();
				});

				elem.on( 'blur', function(){
					elem.val() === '' ? qPlaceShow() : qPlaceHide();
				});

				scope.$watch( elem.attr('data-ng-model'), qPlaceToggle );
			}
		};	
	}

	// placeholder.$inject = [
	// ];

	return placeholder;
});