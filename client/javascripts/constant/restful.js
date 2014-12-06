'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	return {
		'user': {
			'create': {
				'method': 'POST',
				'url': '/api/Users'
			}, 
			'update': {
				'method': 'PUT',
				'url': '/api/Users/:id'
			}, 
			'delete': {
				'method': 'DELETE',
				'url': '/api/Users/:id'
			},
			'list': {
				'method': 'GET',
				'url': '/api/Users'
			}, 
			'item': {
				'method': 'GET',
				'url': '/api/Users/:id'
			},
			'has': {
				'method': 'GET',
				'url': '/api/Users/:id/exists'
			},
			'count': {
				'method': 'GET',
				'url': '/api/Users/count'
			}, 
			'login': {
				'method': 'POST',
				'url': '/api/Users/login'
			}, 
			'logout': {
				'method': 'POST',
				'url': '/api/Users/logout'
			}
		},
		'feed': {
			'create': {
				'method': 'POST',
				'url': '/api/services'
			}, 
			'update': {
				'method': 'PUT',
				'url': '/api/services/:id'
			}, 
			'delete': {
				'method': 'DELETE',
				'url': '/api/services/:id'
			}, 
			'list': {
				'method': 'GET',
				'url': '/api/services'
			}, 
			'item': {
				'method': 'GET',
				'url': '/api/services/:id'
			}, 
			'has': {
				'method': 'GET',
				'url': '/api/services/:id/exists'
			}, 
			'count': {
				'method': 'GET',
				'url': '/api/services/count'
			},
			'user': {
				'count': {
					'method': 'GET',
					'url': '/api/services/count/user'
				}
			}
		}
	};
});