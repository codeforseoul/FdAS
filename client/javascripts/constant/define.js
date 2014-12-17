'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){
	return {
		'host': 'localhost:8000',
		'serviceHost': 'localhost:3000',
		'introSwipeTime': 250,
		'feedsLimit': 5,
		'repliesLimit': 5,
		'sns': {
			'facebook': {
				'appId': '734387796636874',
			    "secret": "82f0af104381453d298b6bfd62a2cb97",
				'scope': [ 'public_profile', 'user_birthday', 'user_location', 'email', 'user_photos' ],

				"module": "passport-facebook",
				"clientID": "734387796636874",
				"clientSecret": "82f0af104381453d298b6bfd62a2cb97",
				"callbackURL": "http://localhost:3030/auth/facebook/callback",
				"authPath": "/auth/facebook",
				"callbackPath": "/auth/facebook/callback",
				"successRedirect": "/auth/account"
			}
		},
		'gender': [
			{
				'val': 'male',
				'label': '남자'
			}, {
				'val': 'female',
				'label': '여자'
			}
		],
		'locations': [
			{ 
				'val': 0, 
				'label': '전체' 
			}, { 
				'val': 1, 
				'label': '종로구' 
			}, { 
				'val': 2, 
				'label': '중구' 
			}, { 
				'val': 3, 
				'label': '용산구' 
			}, { 
				'val': 4, 
				'label': '성동구' 
			}, { 
				'val': 5, 
				'label': '광진구' 
			}, { 
				'val': 6, 
				'label': '동대문구' 
			}, { 
				'val': 7, 
				'label': '중랑구' 
			}, { 
				'val': 8, 
				'label': '성북구' 
			}, { 
				'val': 9, 
				'label': '강북구' 
			}, { 
				'val': 10, 
				'label': '도봉구' 
			}, { 
				'val': 11, 
				'label': '노원구' 
			}, { 
				'val': 12, 
				'label': '은평구' 
			}, { 
				'val': 13, 
				'label': '서대문구' 
			}, { 
				'val': 14, 
				'label': '마포구' 
			}, { 
				'val': 15, 
				'label': '양천구' 
			}, { 
				'val': 16, 
				'label': '강서구' 
			}, { 
				'val': 17, 
				'label': '구로구' 
			}, { 
				'val': 18, 
				'label': '금천구' 
			}, { 
				'val': 19, 
				'label': '영등포구' 
			}, { 
				'val': 20, 
				'label': '동작구' 
			}, { 
				'val': 21, 
				'label': '관악구' 
			}, { 
				'val': 22, 
				'label': '서초구' 
			}, { 
				'val': 23, 
				'label': '강남구' 
			}, { 
				'val': 24, 
				'label': '송파구' 
			}, { 
				'val': 25, 
				'label': '강동구' 
			}
		],
		'children': [ 
			{ 
				'val': -1,
				'label': '준비중' 
			}, 
			{ 
				'val': 0,
				'label': '임신중' 
			}, 
			{ 
				'val': 1,
				'label': '1명' 
			}, 
			{ 
				'val': 2,
				'label': '2명' 
			}, 
			{ 
				'val': 3,
				'label': '3명 이상'  
			}
		],
		'categories': [
			{
				'val': 'female',
				'label': '여성'
			}, {
				'val': 'education',
				'label': '교육'
			}, {
				'val': 'safety',
				'label': '안전'
			}, {
				'val': 'health',
				'label': '건강'
			}, {
				'val': 'family',
				'label': '가족'
			}, {
				'val': 'economy',
				'label': '경제'
			}, {
				'val': 'employment',
				'label': '고용'
			}, {
				'val': 'life',
				'label': '생활환경'
			}, {
				'val': 'etc',
				'label': '기타'
			}
		]
	}
});