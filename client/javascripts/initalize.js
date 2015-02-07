'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([ 
	'text!../template/intro.html', 
	'text!../template/main.html',
	'module'
], function( introHTML, mainHTML, module ){

	function initalize( $rootScope, $location, Define, StoreService, AuthService, SnsService, DeviceBridge ){
		var loadTime = new Date().getTime() - module.config().startTime,
			leftTime = Define.minimumLoadTime - loadTime;

		// load other service
		SnsService.load( 'facebook' );
		SnsService.load( 'kakaotalk' );

		// device call from android
		window.fromDeviceCall = function( func_name, data ){
			DeviceBridge[ func_name ].apply( this, [ data ] );
		};

		// alarm service?
		if ( StoreService.get( 'appAlarm' ) === null ){
			DeviceBridge.alarmSetToDevice( true, true );
		}

		// TODO
		// minimum load time
		// if ( leftTime > 100 ){
		// 	setTimeout( deferInitalize, leftTime );
		// } else {
			deferInitalize();
		// }

		function deferInitalize(){
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
				$location.path( 'intro' );
			}
		}
	}

	initalize.$inject = [
		'$rootScope', 
		'$location', 
		'Define',
		'StoreService', 
		'AuthService', 
		'SnsService',
		'DeviceBridge'
	];

	return initalize;
});