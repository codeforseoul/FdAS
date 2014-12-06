'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([
	// libary
		'text',
	// angular
		'angular',
		'angular-route',
		'angular-resource',
		'angular-animate',
		'angular-touch',
	// html
		'text!../template/intro.html',
		'text!../template/main.html',
	// constant
		'constant/define',
		'constant/restful',
	// config
		'config/commonCfg',
		'config/httpCfg',
		'config/routesCfg',
	// factory
		'factory/storageFty',
		'factory/deviceFty',
	// service
		'service/storageSvc',
		'service/snsSvc',
		'service/feedSvc',
	// directive
		'directive/imgDir',
		'directive/starDir',
		'directive/starInputDir',
		'directive/placeholderDir',
		'directive/previewImgDir',
	// controller
		'controller/introCtrl',
		'controller/mainCtrl',
		'controller/myCtrl',
		'controller/myInfoCtrl',
		'controller/appSettingCtrl',
		'controller/appIntroCtrl',
		'controller/feedCommonCtrl',
		'controller/feedListCtrl',
		'controller/feedItemCtrl',
		'controller/feedCreateCtrl',
		'controller/categoryCtrl'
], function( 
	// libaray
		text,
	// angular
		angular, 
		angularRoute, 
		angularResource, 
		angularAnimate, 
		angularTouch,
	// html
		introHTML,
		mainHTML,
	// contant
		define,
		restful,
	// config
		commonCfg,
		httpCfg,
		routesCfg,
	// factory
		storageFty,
		deviceFty,
	// service
		storageSvc, 
		snsSvc,
		feedSvc,
	// directive
		imgDir,
		starDir,
		starInputDir,
		placeholderDir,
		previewImgDir,
	// controller
		introCtrl,
		mainctrl,
		myCtrl,
		myInfoCtrl,
		appSettingCtrl,
		appIntroCtrl,
		feedCommonCtrl,
		feedListCtrl,
		feedItemCtrl,
		feedCreateCtrl,
		categoryCtrl ){
	var commonModule = 
		angular.
			module( 'fdasApp.common', [ 'ngRoute', 'ngResource', 'ngAnimate' ] ).
			constant( 'Define', define ).
			constant( 'Restful', restful ).
			config( commonCfg ).
			config( httpCfg ).
			config( routesCfg ).
			factory( 'storageFty', storageFty ).
			factory( 'deviceFty', deviceFty ).
			service( 'storageSvc', storageSvc ).
			service( 'snsSvc', snsSvc ).
			directive( 'imgDir', imgDir ).
			directive( 'starDir', starDir ).
			directive( 'starInputDir', starInputDir ).
			directive( 'placeholderDir', placeholderDir ).
			directive( 'previewImgDir', previewImgDir );

	var myModule = 
		angular.
			module( 'fdasApp.my', [ 'fdasApp.common' ] ).
			controller( 'myCtrl', myCtrl ).
			controller( 'myInfoCtrl', myInfoCtrl ).	
			controller( 'appSettingCtrl', appSettingCtrl ).	
			controller( 'appIntroCtrl', appIntroCtrl );

	var feedModule = 
		angular.
			module( 'fdasApp.feed', [ 'fdasApp.common' ] ).
			service( 'feedSvc', feedSvc ).
			controller( 'feedCommonCtrl', feedCommonCtrl ).
			controller( 'feedListCtrl', feedListCtrl ).
			controller( 'feedItemCtrl', feedItemCtrl ).
			controller( 'feedCreateCtrl', feedCreateCtrl );

	var categoryModule = 
		angular.
			module( 'fdasApp.category', [ 'fdasApp.common' ] ).
			controller( 'categoryCtrl', categoryCtrl );

	var introModule = 
		angular.
			module( 'fdasApp.intro', [ 'ngTouch' ] ).
			controller( 'introCtrl', introCtrl );

	var mainModule = 
		angular.
			module( 'fdasApp', [ 
				'fdasApp.intro', 
				'fdasApp.my', 
				'fdasApp.feed', 
				'fdasApp.category' 
			]).
			controller( 'mainCtrl', mainctrl ).
			run([ '$location', 'storageSvc', 'snsSvc', function( $location, storageSvc, snsSvc ){

				// facebook load
				snsSvc.load( 'facebook' );

				// check url
				// $location.path( 'intro' );
				// $location.path( 'my' );
				// $location.path( 'my/info' );
				// $location.path( 'app/setting' );
				// $location.path( 'app/introduce' );
				// $location.path( 'category' );

				// $location.path( 'feeds' );
				// $location.path( 'feeds/my' );		
				// $location.path( 'feeds/mine' );		
				// $location.path( 'feed/123' );
				// $location.path( 'create/feed' );
				// $location.path( 'aaa' );

				// loading done
				document.getElementById( 'bodyLy' ).innerHTML = mainHTML;

				if ( storageSvc.get( 'isAppInit' ) ){
					$location.path( 'feeds' );
				} else {
					storageSvc.save({
						'isAppInit': true
					});
					$location.path( 'intro' );
				}
			}]);

	// angular 부트스트래핑
	angular.bootstrap( document, [ 'fdasApp' ]);

	return mainModule;
});
