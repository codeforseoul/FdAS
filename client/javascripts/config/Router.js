'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	// route
	function routesConfig( $routeProvider, $httpProvider ){
		$routeProvider.
			when( '/intro', {
				'templateUrl': 'template/intro.html',
				'controller': 'IntroController'
			}).
			when( '/auth', {
				'templateUrl': 'template/auth.html',
				'controller': 'AuthController'
			}).
			when( '/my', {
				'templateUrl': 'template/my.html',
				'controller': 'MyController'
			}).
			when( '/my/info', {
				'templateUrl': 'template/my-info.html',
				'controller': 'MyInfoController'
			}).
			when( '/category', {
				'templateUrl': 'template/category.html',
				'controller': 'CategoryController'
			}).
			when( '/app/setting', {
				'templateUrl': 'template/app-setting.html',
				'controller': 'AppSettingController'
			}).
			when( '/app/introduce', {
				'templateUrl': 'template/app-introduce.html'
			}).
			when( '/feeds/:svc?', {
				'templateUrl': 'template/feed-list.html',
				'controller': 'FeedListController'
			}).
			when( '/feed/:feedId', {
				'templateUrl': 'template/feed-item.html',
				'controller': 'FeedItemController'
			}).
			when( '/create/feed', {
				'templateUrl': 'template/feed-form.html',
				'controller': 'FeedFormController'
			}).
			when( '/update/feed/:feedId', {
				'templateUrl': 'template/feed-form.html',
				'controller': 'FeedFormController'
			}).
			when( '/404', {
				'templateUrl': 'template/404.html'
			}).
			otherwise({
				'redirectTo': '/404'
			});

		$httpProvider.interceptors.push([ $q ], function( '$q' ){
			return {
				'responseError': function( response ){
					if ( response.status === 401 || response.status === 403 ){
						return $q.reject( response );
					}

					return $q.reject( response );
				}
			};
		});
	}

	routesConfig.$inject = [
		'$routeProvider',
		'$httpProvider'
	];

	return routesConfig;
});