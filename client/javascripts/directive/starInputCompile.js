'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function starInputCompile(){
		return {
			'restrict': 'A',
			'template': '<div class="starRating">' + 
							'<span class="ico star"' +
								'data-ng-repeat="idx in [] | range:full"' + 
								'data-ng-mouseover="rating( idx )"' + 
								'data-ng-class="{\'full\':idx <= val, \'blank\':idx > val }">' + 
							'</span>' + 
						'</div>',
			'replace': true,
			'priority': 1,
			'transclude': false,
			'scope': {},
			'link': function( scope, elem, attrs ){
				scope.full = 5;
				scope.rating = function( idx ){
					scope.val = idx;
					scope.$parent.starVal = idx;
				};		
			}
		};	
	}

	// starInputCompile.$inject = [
	// ];

	return starInputCompile;
});