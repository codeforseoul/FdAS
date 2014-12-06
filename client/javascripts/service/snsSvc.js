'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function snsSvc( $q, $resource, $timeout, Define, Restful ){
		var fb = {
			'load': function(){
				var d = document,
					s = 'script',
					id = 'facebook-jssdk';
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);

				window.fbAsyncInit = function(){
					FB.init({
						appId      : Define.sns.fb.appId,
						cookie     : true,  // enable cookies to allow the server to access // the session
						xfbml      : true,  // parse social plugins on this page
						version    : 'v2.1' // use version 2.1
					});
				}
			},
			'login': function( _success ){
				FB.getLoginStatus( function( response ){
					
					if ( response.status === 'connected' ){
						FB.login( function( response ){

							if ( response.authResponse ){
								FB.api( '/me', _success );
							} else {
								console.log( '연결에 실패하였습니다.' );
							}
						}, {
							scope: Define.sns.fb.permissions,
							return_scopes: true
						});
					} else if ( response.status === 'not_authorized' ){
						// 페이스북 로그인은 되어 있으나 권한 승인 안됨.
						alert( '연결에 실패하였습니다.' );
					} else {
						// 페이스북 로그인이 안됨.
						alert( '연결에 실패하였습니다.' );
					}
				});
			}
		};

		function isFB( _sns ){
			var sns = _sns.toLowerCase();

			return sns === 'fb' || sns === 'facebook';
		}

		this.load = function( _sns ){

			if ( isFB( _sns ) ){
				fb.load();
			}
		};
		
		this.login = function( _sns ){

			if ( isFB( _sns ) ){

				// facebook login success callback
				fb.login( function( user ){
					// 회원가입 확인을 위해 지웠다가 확인함.
					// var tmpR = $resource( Restful.user.delete.url ),
					// 	tmpP = tmpR.delete({
					// 		'id': user.id
					// 	}).$promise;

					// tmpP.then( function(){
						var newDeferred = $q.defer(),
							newPromise = newDeferred.promise;

						// 존재하면 로그인 표시만, 존재하지 않으면 가입
						$resource( Restful.user.has.url ).get({
							'id': user.id
						}).$promise.then( function( _res ){
							_res.exists === true ? newDeferred.reject() : newDeferred.resolve();
						});

						newPromise.then( function(){

							// save
							$resource( Restful.user.create.url ).save({
								'id': user.id
							}, function(){	// save success
								console.log( 'save clear' );
							}, function(){	// save error
								console.log( 'save error' );
							});
						}, function(){
							console.log( 'already exists' );
						});

						newPromise.finally( function(){
							console.log( 'login check' );
							// 	'gender': response.gender,
							// 	'location': response.location.name,
							// 	'birth': response.birthday.split( '/' )[ 2 ]
						});
					// });
				});
			}
		};

		this.share = function( _sns, url ){

			if ( isFB( _sns ) ){
				FB.ui({
					method: 'share',
					href: 'https://developers.facebook.com/docs/',
				}, function( response ){
					console.log( response );
				});	
			}
		};
	}

	snsSvc.$inject = [
		'$q',
		'$resource', 
		'$timeout',
		'Define',
		'Restful'
	];

	return snsSvc;
});