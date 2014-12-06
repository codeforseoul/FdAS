'use strict';

/**
 * @author: CodeforSeoul by blim(kkh975@naver.com)
 */

define([], function(){

	function storageSvc( Define, storageFty ){

		/**
		 * @param {String}
		 */
		this.get = function( _key ){
			var tmp = null,
				val = null;

			switch( _key ){
				// single object form value
				case 'myAge':
				case 'child1':
				case 'child2':
				case 'child3':
					val = storageFty.getItem( _key );

					return val === null ? {} : {
						'val': val,
						'label': val + Define.subfix.age
					};

				// single object
				case 'myGender':
				case 'myLocation':
				case 'myChildren':
					tmp = _key.replace( 'my', '' ).toLowerCase();
					val = storageFty.getItem( _key );

					return val === null ? {} : Define[ tmp ].filter( function( item ){
						return item.val === val;
					})[ 0 ];

				// multi object
				case 'myCategories':
					tmp = _key.replace( 'my', '' ).toLowerCase();
					val = storageFty.getItem( _key );

					return val === null ? [] : Define[ tmp ].filter( function( item ){
						return val.indexOf( item.val.toString() ) > -1;
					});

				// array
				case 'myScrap':
					tmp = storageFty.getItem( _key, 'string' );
					return tmp === null ? [] : tmp.split( ',' );

				// isInit, appAlarm, snsFb, myPic
				default:
					return storageFty.getItem( _key );
			}
		};

		/**
		 * @param {Object}
		 */
		this.save = function( _data ){	
			var key = null;

			for( key in _data ){

				if ( typeof _data[ key ] === 'undefined' || _data[ key ] === null ){	
					storageFty.removeItem( key );
				} else {

					// val 값만 저장
					switch( key ){ 
						// single object
						case 'myAge':
						case 'myGender':
						case 'myLocation':
						case 'myChildren':
						case 'child1':
						case 'child2':
						case 'child3':
							storageFty.setItem( key, _data[ key ].val );
							break;

						// multi object
						case 'myCategories':
							storageFty.setItem( key, _data[ key ].map( function( item ){
								return item.val;
							}).join( ',' ) );
							break;

						// array
						case 'myScrap':
							storageFty.setItem( key, _data[ key ].join( ',' ) );
							break;

						// isInit, appAlarm, snsFb, myPic
						default:
							storageFty.setItem( key, _data[ key ] );							
							break;
					}
				}
			}
		};
	};

	storageSvc.$inject = [ 
		'Define',
		'storageFty'
	];

	return storageSvc;
});