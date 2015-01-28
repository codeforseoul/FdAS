var gcm = require('node-gcm');

// create a message with default values
// var message = new gcm.Message();

// or with object values
var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        key1: '안녕하세요.',
        key2: 'saltfactory push demo'
    }
});

var server_access_key = 'AIzaSyACRdFNYuZauygD-hhJG3rFiavqjz4ilPs';
var sender = new gcm.Sender(server_access_key);
var registrationIds = [];

var registration_id = 'AIzaSyAUp1ZVI-4ly6hEIdf335IPAcDfvhpJiBk';
registrationIds.push(registration_id); // At least one required

/**
 * Params: message-literal, registrationIds-array, No. of retries, callback-function
 **/
sender.send(message, registrationIds, 4, function (err, result) {
    console.log(result);
});