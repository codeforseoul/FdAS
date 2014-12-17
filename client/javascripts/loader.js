'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

// window.fdasAppLoadStart = new Date().getTime();
requirejs.config({
	'baseUrl': '../javascripts',
	'paths': {
		'text': '../bower_components/requirejs/text',
		'jquery': '../bower_components/jquery/jquery.min',
		'angular': '../bower_components/angular/angular.min',
		'angular-route': '../bower_components/angular-route/angular-route.min',
		'angular-resource': '../bower_components/angular-resource/angular-resource.min',
		'angular-animate': '../bower_components/angular-animate/angular-animate.min',
		'angular-touch': '../bower_components/angular-touch/angular-touch.min',
		'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
	},
	'shim': {
		'angular': {
			'deps': [ 'jquery' ],
			'exports': 'angular'
		},
		'angular-route': {
			'deps': [ 'angular' ]
		},
		'angular-resource': {
			'deps': [ 'angular' ]
		},
		'angular-animate': {
			'deps': [ 'angular' ]
		},
		'angular-touch': {
			'deps': [ 'angular' ]
		},
		'angular-mocks': {
			'deps': [ 'angular' ]
		},
		'app': {
			'deps': [ 'angular' ]
		}
	},
	'config': {
		'isLoaded': false	// 로드 및 모듈 완료 플래그
	},
	'deps': [ 'app' ]
});