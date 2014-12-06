'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function starDir(){
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
			'priority': 1,
			'transclude': false,
			'scope': false,
			'link': function( scope, elem, attrs ){
				var score = Math.round( parseFloat( attrs.starDir ) );

				scope.full = score;
				scope.blank = 5 - score;
			}
		};	
	}

	// starDir.$inject = [
	// ];

	return starDir;
});