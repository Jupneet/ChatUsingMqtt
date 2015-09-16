var mqtt = require('mqtt');
var client = mqtt.connect();

var message = {
  topic: 'mqtt/offline',
  payload: 'hello', 
  qos: 1, 
  retain: false
};

client.publish(message,
  function() {
  console.log("pubOffline","publish done!");
  client.end();
});