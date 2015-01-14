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
		'angular-mocks',
	// constant
		'constant/define',
	// config
		'config/Configuration',
		'config/Router',
	// factory
		'factory/LocalStorage',
		'factory/DeviceBridge',
		'factory/CommonHelper',
	// service
		'service/StoreService',
		'service/ResourceService',
		'service/AuthService',
		'service/SnsService',
		'service/FeedService',
	// directive
		'directive/dialogCompile',
		'directive/feedCompile',
		'directive/replyCompile',
		'directive/imgCompile',
		'directive/starCompile',
		'directive/starInputCompile',
		'directive/placeholderCompile',
		'directive/previewImageCompile',
	// controller
		'controller/IntroController',
		'controller/AuthController',
		'controller/MainController',
		'controller/DialogController',
		'controller/MyController',
		'controller/MyInfoController',
		'controller/AppSettingController',
		'controller/CategoryController',
		'controller/FeedListController',
		'controller/FeedItemController',
		'controller/FeedFormController',
	// other
		'initalize',
	// test
		'test/TestModule' ], 
	function( 
	// libaray
		text,
	// angular
		angular, 
		angularRoute, 
		angularResource, 
		angularAnimate, 
		angularTouch,
		angularMocks,
	// contant
		Define,
	// config
		Configuration,
		Router,
	// factory
		LocalStorage,
		DeviceBridge,
		CommonHelper,
	// service
		StoreService, 
		ResourceService,
		AuthService,
		SnsService,
		FeedService,
	// directive
		dialogCompile,
		feedCompile,
		replyCompile,
		imgCompile,
		starCompile,
		starInputCompile,
		placeholderCompile,
		previewImageCompile,
	// controller
		IntroController,
		AuthController,
		MainController,
		DialogController,
		MyController,
		MyInfoController,
		AppSettingController,
		CategoryController,
		FeedListController,
		FeedItemController,
		FeedFormController,
	// other
		initalize,
	// test
		TestModule ){

	// common module
	angular.
		module( 'fdasApp.common', [ 'ngRoute', 'ngResource', 'ngAnimate'/*, 'fdasApp.test'*/ ] ).
		constant( 'Define', Define ).
		config( Configuration ).
		config( Router ).
		factory( 'LocalStorage', LocalStorage ).
		factory( 'DeviceBridge', DeviceBridge ).
		factory( 'CommonHelper', CommonHelper ).
		service( 'StoreService', StoreService ).
		service( 'ResourceService', ResourceService ).
		service( 'AuthService', AuthService ).
		service( 'SnsService', SnsService ).
		service( 'FeedService', FeedService ).
		directive( 'dialogCompile', dialogCompile ).
		directive( 'feedCompile', feedCompile ).
		directive( 'replyCompile', replyCompile ).
		directive( 'imgCompile', imgCompile ).
		directive( 'starCompile', starCompile ).
		directive( 'starInputCompile', starInputCompile ).
		directive( 'placeholderCompile', placeholderCompile ).
		directive( 'previewImageCompile', previewImageCompile );

	// intro module
	angular.
		module( 'fdasApp.intro', [ 'ngTouch' ] ).
		controller( 'IntroController', IntroController );

	// my module
	angular.
		module( 'fdasApp.my', [ 'fdasApp.common' ] ).
		controller( 'MyController', MyController ).
		controller( 'MyInfoController', MyInfoController ).	
		controller( 'AppSettingController', AppSettingController ).	
		controller( 'CategoryController', CategoryController );

	// feed module
	angular.
		module( 'fdasApp.feed', [ 'fdasApp.common' ] ).
		controller( 'FeedListController', FeedListController ).
		controller( 'FeedItemController', FeedItemController ).
		controller( 'FeedFormController', FeedFormController );

	// main module
	angular.
		module( 'fdasApp', [ 'fdasApp.intro', 'fdasApp.my', 'fdasApp.feed' ]).
		controller( 'MainController', MainController ).
		controller( 'DialogController', DialogController ).
		controller( 'AuthController', AuthController ).
		run( initalize );

	// angular 부트스트래핑
	angular.bootstrap( document, [ 'fdasApp' ]);
});
