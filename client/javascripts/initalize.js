'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([ 
	'text!../template/intro.html', 
	'text!../template/main.html' 
], function( introHTML, mainHTML ){

	function initalize( $rootScope, $location, StoreService, AuthService, SnsService ){

		// loading done
		document.getElementById( 'bodyLy' ).innerHTML = mainHTML;

		// initalize app
		if ( StoreService.get( 'isAppInit' ) ){
			$location.path( 'feeds' );
			AuthService.setAuth();

			// check list url
			// $location.path( 'intro' );
			// $location.path( 'my' );
			// $location.path( 'my/info' );	
			// $location.path( 'app/setting' );
			// $location.path( 'app/introduce' );
			// $location.path( 'category' );

			// $location.path( 'feeds' );
			// $location.path( 'feeds/my' );		
			// $location.path( 'feeds/mine' );
			// $location.path( 'feed/548d6f0f6c7881480179e4ae' );		
			// $location.path( 'create/feed' );
			// $location.path( 'update/feed/548d6f0f6c7881480179e4ae' );

			// $location.path( 'feed/1235678' );
			// $location.path( 'update/feed/12345678' );
			// $location.path( 'aaa' ); // error occur
		} else {
			StoreService.save({
				'isAppInit': true
			});
			$location.path( 'intro' );
		}

		// load other service
		SnsService.load( 'facebook' );
	}

	initalize.$inject = [
		'$rootScope', 
		'$location', 
		'StoreService', 
		'AuthService', 
		'SnsService'
	];

	return initalize;
});