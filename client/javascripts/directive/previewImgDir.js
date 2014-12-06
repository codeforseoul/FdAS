'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function previewImgDir( $q ){	
		return {
			'restrict': 'A',
			'replace': false,
			'priority': 1,
			'transclude': false,
			'scope': false,
			'link': function( scope, elem, attrs ){
				var reader = new FileReader(),
					qWrap = angular.element( '<div class="preview"></div>' ),
					qPreImg = angular.element( '<img alt="">' ),
					qDelBtn = angular.element( '<button type="button"></button>' );

				qWrap.append( qPreImg, qDelBtn );
				elem.after( qWrap );

				elem.bind( 'change', function( e ){
					reader.readAsDataURL( elem[ 0 ].files[ 0 ] );
				});

				qDelBtn.bind( 'click', function( e ){
					// 삭제
					// elem.after( qWrap );
				});

				reader.onload = function( e ){
					qPreImg.attr( 'src', e.target.result );
				}
			}
		};	
	}

	previewImgDir.$inject = [
		'$q'
	];

	return previewImgDir;
});