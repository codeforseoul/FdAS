'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function previewImageCompile(){	
		return {
			'restrict': 'A',
			'link': function( $scope, elem, attrs ){
				var reader = new FileReader(),
					qWrap = angular.element( '<div class="preview"></div>' ),
					qDelBtn = angular.element( '<button type="button" data-ng-click="change( $event )"></button>' ),
					qPreImg = angular.element( '<img alt="">' ),
					preImg = new Image;

				function show(){
					qWrap.css( 'display', 'block' );					
				}

				function hide(){
					qWrap.css( 'display', 'none' );					
				}

				qWrap.append( qPreImg, qDelBtn );
				elem.after( qWrap );
				hide();

				// delete
				qDelBtn.bind( 'click', function( e ){
					$scope[ attrs.ngModel ] = null;
					elem.val( '' );
					hide();
				});

				// file change
				elem.bind( 'change', function( e ){
					reader.readAsDataURL( elem[ 0 ].files[ 0 ] );
				});

				// file onload
				reader.onload = function( e ){
					var str = e.target.result;
					
					qPreImg.attr( 'src', str );
					$scope[ attrs.ngModel ] = str;
					show();
				}
			}
		};	
	}

	previewImageCompile.$inject = [
	];

	return previewImageCompile;
});