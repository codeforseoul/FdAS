'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function feedSvc( $q, $resource, $timeout, storageSvc, snsSvc ){

		this.isFeedScrap = function( id ){
			return storageSvc.get( 'myScrap' ).indexOf( id ) > -1;
		};

		this.feedScrap = function( id ){
			var myScrap = storageSvc.get( 'myScrap' ),
				findIdx = myScrap.indexOf( id );

			if ( id ){

				if ( findIdx > -1 ){
					myScrap.splice( findIdx, 1 );
					storageSvc.save({
						'myScrap': myScrap
					});
				} else {
					myScrap.push( id );
					storageSvc.save({
						'myScrap': myScrap
					});
				}
			}
		};

		this.feedShare = function( sns, id ){
			snsSvc.share( sns, id );
		};

		this.feedRating = function( val, id ){
			console.log( val, id );
		};
	}

	feedSvc.$inject = [
		'$q', 
		'$resource',
		'$timeout',
		'storageSvc',
		'snsSvc'
	];

	return feedSvc;
});