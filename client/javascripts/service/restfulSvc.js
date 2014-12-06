'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function restfulSvc( $resource, Define ){
		var cat = '',
			key = '',
			obj = null;

		this.get = function( _svc ){
			var svcs = _svc.split( '.' ),
				key1 = svcs[ 0 ],
				key2 = svcs[ 1 ],
				svc = Define.restful[ key1 ][ key2 ];
				// action = {};

			// switch( svc.method ){
			// 	case 'GET':
			// 		action = {
			// 			'get': {
			// 				'method': svc.method
			// 			}
			// 		};
			// 		break;
			// 	case 'POST':
			// 		action = {
			// 			'post': {
			// 				'method': svc.method
			// 			}
			// 		};
			// 		break;
			// }

			// return $resource( svc.url, null, action );
			return $resource( svc.url );
		}

	}

	restfulSvc.$inject = [
		'$resource',
		'Define'
	];

	return restfulSvc;
});