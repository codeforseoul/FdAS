'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function ResourceService( $resource, Define ){
		return {
			'user': {
				'method': $resource( Define.serviceHost + '/api/users', null ),
				'item': $resource( Define.serviceHost + '/api/users/:id', null, {
					'id': '@id'
				}),
				'count': $resource( Define.serviceHost + '/api/users/count', null ),
				'auth': $resource( Define.serviceHost + '/isauth', null )
			},
			'feed': {
				'method': $resource( Define.serviceHost + '/api/services', null ),
				'count': $resource( Define.serviceHost + '/api/services/count', null ),
				'findOne': $resource( Define.serviceHost + '/api/services/findOne', null ),
				'item': $resource( Define.serviceHost + '/api/services/:id', {
					'id': '@id'
				}, {
					'update': {
						method: 'PUT'
					},
					'delete': {
						method: 'PUT'
					}
				}),

				// 댓글
				'reply': {
					'method': $resource( Define.serviceHost + '/api/replies', null ),
					'count': $resource( Define.serviceHost + '/api/replies/count', null )
					// angular :id 뒤에 추가 Define.serviceHost 에러발생
					// 'count': $resource( Define.serviceHost + '/api/services/:id/replies/count', {
					// 	'id': '@id'
					// })
				},

				// 별
				'star': {
					'method': $resource( Define.serviceHost + '/api/grades', null ),
					'count': $resource( Define.serviceHost + '/api/grades/count', null ),
					'item': $resource( Define.serviceHost + '/api/grades/:id', {
						'id': '@id'
					}, {
						'update': {
							method: 'PUT'
						},
						'delete': {
							method: 'PUT'
						}
					})
					// 'item': $resource( Define.serviceHost + '/api/grades/:id', {
					// 	'id': '@id'
					// }, {
					// 	'update': {
					// 		method: 'PUT'
					// 	},
					// 	'delete': {
					// 		method: 'PUT'
					// 	}
					// }),
				}
			}
		};
	}

	ResourceService.$inject = [
		'$resource',
		'Define'
	];

	return ResourceService;
});