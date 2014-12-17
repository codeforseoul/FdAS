'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function starCompile(){
		return {
			'restrict': 'A',
			'template': '<div class="starRating">' + 
							'<span class="ico star2 full"' +
								'data-ng-repeat="idx in [] | range:full">' + 
							'</span>' + 
							'<span class="ico star2 blank"' +
								'data-ng-repeat="idx in [] | range:blank">' + 
							'</span>' + 
						'</div>',
			'replace': true,
			'priority': 0,
			'transclude': false,
			'scope': true,
			'link': function( scope, elem, attrs ){
				scope.full = 5;
				scope.blank = 0;

				function setStar( star ){
					star = Math.round( parseFloat( star ) );
					scope.full = star;
					scope.blank = 5 - star;
				}

				// set
				setStar( attrs.starCompile );

				// watch
				scope.$watch( '$parent.feed.star', function( newStar ){
					setStar( newStar );
				});
			}
		};	
	}

	// starCompile.$inject = [
	// ];

	return starCompile;
});