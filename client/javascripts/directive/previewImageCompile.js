'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function previewImageCompile(){	
		return {
			'restrict': 'A',
			// 'template': '<div class="preview"><img alt=""><button type="button" data-ng-click="chnage()"></button></div>',
			// 'transclude': false,
			// 'replace': true,
			// 'scope': {
			// 	'change': '&'
			// },
			'link': function( $scope, elem, attrs ){
				var reader = new FileReader(),
					qWrap = angular.element( '<div class="preview"></div>' ),
					qDelBtn = angular.element( '<button type="button" data-ng-click="change( $event )"></button>' ),
					qPreImg = angular.element( '<img alt="">' ),
					preImg = new Image;

				console.log( $scope );
				console.log( elem );
				console.log( attrs );

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

					console.log('------------------');
					console.log( attrs.ngModel )
					console.log( $scope[ attrs.ngModel ] )
				});

				// file change
				elem.bind( 'change', function( e ){
					$scope[ attrs.ngModel ] = elem[ 0 ].files[ 0 ];
					reader.readAsDataURL( elem[ 0 ].files[ 0 ] );

					console.log('------------------');
					console.log( attrs.ngModel )
					console.log( $scope[ attrs.ngModel ] )
				});

				// file onload
				reader.onload = function( e ){
					qPreImg.attr( 'src', e.target.result );
					show();
				}
			}
		};	
	}

	previewImageCompile.$inject = [
	];

	return previewImageCompile;
});