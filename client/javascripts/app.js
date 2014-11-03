'use strict';

/**
 * @author: blim(kkh975@naver.com)
 */

angular.module( 'fdasApp', [ 'ngRoute', 'fdasApp.common.service', 'fdasApp.my', 'fdasApp.interest', 'fdasApp.feed' ] );
angular.module( 'fdasApp.common.service', [ 'ngResource' ] );

// my
angular.module( 'fdasApp.my', [ 'fdasApp.my.controller' ] );
angular.module( 'fdasApp.my.controller', [] );

// feed
angular.module( 'fdasApp.feed', [ 'fdasApp.feed.controller' ] );
angular.module( 'fdasApp.feed.controller', [ /*'ngSanitize'*/ ] );

// interest
angular.module( 'fdasApp.interest', [ 'fdasApp.interest.controller' ] );
angular.module( 'fdasApp.interest.controller', [] );


angular.
	module( 'fdasApp' ).
	controller( 'fdasMainCtrl', [ '$scope', '$filter', 'Feed', function( $scope, $filter, Feed ){
		$scope.template = {
			'my': 'javascripts/my/template/page.html',
			'feed': 'javascripts/feed/template/page.html',
			'interest': 'javascripts/interest/template/page.html'
		};

		$scope.focusView = function( e ){
			var path = ( e.target || e.srcElement ).pathname;
			// $location.path( path );
			e.preventDefault();
		};
	}]).
	run([ '$location', function( $location ){

		if ( $location.path() !== 'feeds' ){
			$location.path( 'feeds' );
		}
	}]);