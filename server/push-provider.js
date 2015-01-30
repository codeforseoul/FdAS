// push module
var apn = require('apn'); // ios push module
var gcm = require('node-gcm'); // android push module

// server module
var loopback = require('loopback');
var app = module.exports = loopback(); 

// message
var send_txt = '안녕하세요.';


/* ios */
// var apnConnection = new apn.Connection({
// 	gateway: '',
// 	cert: '',
// 	key: ''
// });

// var iosDevice = new apn.Device('token');
// var note = new apn.Notification();
// note.badge = 3;
// note.sound = "ping.aiff";
// note.alert = send_txt;
// note.payload = {'messageFrom': 'FdAS'};


/* android */
var registrationIds = [];
var sender = new gcm.Sender('AIzaSyACRdFNYuZauygD-hhJG3rFiavqjz4ilPs'); // server key
var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        key1: send_txt
    }
});


// get push list
// TODO, model 인식 안됨
var userModel = app.models.pushkey || loopback.getModelByType(app.models.pushkey);

userModel.find({}, function(err, lists){
	var len = lists.length;

	while( --len > -1){
		if ( lists[ len ].device === 'android' ){
			registrationIds.push( lists[ len ].registrationId );
		} else if ( list[ len ].device === 'ios' ){
			// apnConnection.pushNotification( note, iosDevice );
		}
	}
});

// var registration_id = 'APA91bFRBkdDW-T12GW6O7l-GnObaAA7TQBIQ0gtzzkPw43N47TeJtN7sMMeNbf_OU8RwmwkcZiSO369eJpXB3iPxwby7JnSNG_kL2fNKEjUQhBRaiQqA2oWaWnZGK3OllxqtxHVowwGIjnZYuKWwWt8_5AM4F1mHQ';
// registrationIds.push(registration_id); // At least one required

console.log( '+ gcm list ----------' );
console.log( registrationIds );

/**
 * Params: message-literal, registrationIds-array, No. of retries, callback-function
 **/
sender.send(message, registrationIds, 4, function (err, result) {
    console.log(result);
});