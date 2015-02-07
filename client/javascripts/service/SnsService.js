'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function SnsService( $rootScope, $q, Define, DeviceBridge, StoreService, ResourceService ){
		var service = {
			'facebook': {
				'load': function( deferred ){
					if ( $rootScope.isDevice ){
						deferred ? deferred.resolve() : null;
						return;
					}

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
				'share': function( data ){
					if ( $rootScope.isDevice ){
						DeviceBridge.facebookShareToDevice( 
							data.title, 
							data.title, 
							data.body, 
							data.url, 
							data.image );
					} else {						
						FB.ui({
							method: 'feed',
							redirect_uri: data.shareUrl,
							name: data.title,
							link: data.url,
							picture: data.image,
							caption: data.title,
							description: data.body
						}, function(){});
					}	
				}
			},
			'kakaotalk': {
				'load': function( deferred ){
					if ( $rootScope.isDevice ){
						deferred ? deferred.resolve() : null;
						return;
					}

					(function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(id)) return;
						js = d.createElement(s); js.id = id;
						js.src = "//developers.kakao.com/sdk/js/kakao.min.js";
						js.onload = function(){
							Kakao.init(Define.sns.kakaotalk.appId);
							deferred ? deferred.resolve() : null;
						}
						fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'kakako-jssdk'));
				},
				'share': function( data ){
					if ( $rootScope.isDevice ){
						DeviceBridge.kakaoShareToDevice( 
							data.title, 
							data.title, 
							data.body, 
							Define.serviceHost + '?bypass=' + data.url, 
							data.image );
					} else {
						var label = data.title + ' : ' + data.body;

						Kakao.Link.sendTalkLink({
							label: label.substring(0, label.length > 300 ? 300 : label.length - 1),
							image: {
								src: data.image,
								width: 320,
								height: 320
							},
							webLink: {
								text: '자세히 보기',
								url: Define.serviceHost + '?bypass=' + data.url
							},
							fail: function(){
								alert( '카카오 링크를 지원하지 않는 기종입니다.' );
							}
						});
					}	
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
		'$rootScope',
		'$q',
		'Define',
		'DeviceBridge',
		'StoreService',
		'ResourceService'
	];

	return SnsService;
});

/* FB.getLoginStatus( function( response ){
	
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
});*/