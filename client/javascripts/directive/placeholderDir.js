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
				var qPara = angular.element( '<p>' + attrs.placeholder + '</p>' );

				function show(){
					qPara.css( 'display', 'block' );					
				}

				function hide(){
					qPara.css( 'display', 'none' );					
				}

				qPara.css({
					'position': 'absolute',
					'top': '0',
					'left': '0',
					'padding': elem.css( 'padding' )
				});

				if ( attrs.placeholderDirStyle ){
					qPara.css( eval('(' + attrs.placeholderDirStyle + ')') )
				}

				qPara.on( 'click', function(){
					elem[ 0 ].focus();
				});

				elem.parent().css( 'position', 'relative' );
				elem.prop( 'placeholder', '' );
				elem.before( qPara );

				elem.on( 'focus', function(){
					hide();
				});
				elem.on( 'blur', function(){
					elem.val() === '' ? show() : hide();
				});
			}
		};	
	}

	// placeholder.$inject = [
	// ];

	return placeholder;
});