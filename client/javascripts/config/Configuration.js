'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function Configuration( $filterProvider ){
		$filterProvider.
			register( 'maxTxt', function(){
				return function( num, max ){

					if ( isNaN( num ) ){
						return num;
					}

					return num > max ? max + '+' : num;
				}
			});
		$filterProvider.
			register( 'minTxt', function(){
				return function( num, min ){

					if ( isNaN( num ) ){
						return num;
					}
					
					return num < min ? min : num;
				}
			});
		$filterProvider.
			register( 'range', function(){
				return function( emptyArr, max, min, subfix ){	
					min = min ? min : 0;
					min = parseInt( min, 10 );
					max = parseInt( max, 10 );
					subfix = subfix ? subfix : 0;

					for ( var idx = min; idx < max; idx++ ){
						emptyArr.push( idx + subfix );
					};

					return emptyArr;
				}
			});
		$filterProvider.
			register( 'rangeObj', function(){
				return function( emptyArr, max, min, subfix ){	
					min = min ? min : 0;
					min = parseInt( min, 10 );
					max = parseInt( max, 10 );
					subfix = subfix ? subfix : 0;

					for ( var idx = min; idx < max; idx++ ){
						emptyArr.push({ 
							'val': idx,
							'label': idx + subfix
						});
					};

					return emptyArr;
				}
			});
		$filterProvider.
			register( 'endDate', function(){
				return function( date ){
					var now = new Date(),
						def = date ? new Date( date ) : new Date();

					return def.getTime() < now.getTime();
				}
			});
	}

	Configuration.$inject = [
		'$filterProvider'
	];

	return Configuration;
});