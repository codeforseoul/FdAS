'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function SnsService( $q, Define, DeviceBridge, StoreService, ResourceService ){
		var service = {
			'facebook': {
				'load': function( deferred ){
					(function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(id)) return;
						js = d.createElement(s); js.id = id;
						js.src = "//connect.facebook.net/en_US/sdk.js";
						fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));

					window.fbAsyncInit = function(){
						FB.init({
							appId      : Define.sns.facebook.appId,
							cookie     : true, 
							xfbml      : true, 	
							version    : 'v2.1'
						});

						deferred ? deferred.resolve() : null;
					};
				},
				'login': function( deferred ){
					FB.getLoginStatus( function( response ){
						
						if ( response.status === 'connected' ){
							FB.login( function( response ){

								if ( response.authResponse ){
									FB.api( '/me', function( user ){
										deferred ? deferred.resolve( user ) : null;
									});
								} else {
									deferred ? deferred.reject() : null;
									alert( '연결에 실패하였습니다.' );
								}
							}, {
								'scope': Define.sns.facebook.scope,
								'return_scopes': true
							});
						} else if ( response.status === 'not_authorized' ){ // 페이스북 로그인은 되어 있으나 권한 승인 안됨.
							deferred ? deferred.reject() : null;
							alert( '연결에 실패하였습니다.' ); 
						} else { // 페이스북 로그인이 안됨.
							deferred ? deferred.reject() : null;
							alert( '연결에 실패하였습니다.' );
						}
					});
				},
				'share': function( data ){
					FB.ui({
						method: 'feed',
						redirect_uri: 'http://' + Define.host + '/#/feed/' + data.id,
						name: data.title,
						link: data.url,
						picture: data.image,
						caption: data.title,
						description: data.description
					}, function(){});	
				}
			},
			'kakaotalk': {
				'load': function( deferred ){
					// DeviceBridge.set();
				},
				'login': function( deferred ){
					// DeviceBridge.set( data );
				},
				'share': function( data ){
					// DeviceBridge.set( data );
				}
			}
		};

		this.load = function( _sns, _deferred ){
			service[ _sns ].load( _deferred );
		};
		
		this.login = function( _sns, _deferred ){
			service[ _sns ].login( _deferred );
		};

		this.share = function( _sns, data ){
			service[ _sns ].share( data );
		};
	}

	SnsService.$inject = [
		'$q',
		'Define',
		'DeviceBridge',
		'StoreService',
		'ResourceService'
	];

	return SnsService;
});