var mosca = require('mosca');
var util = require('util');
 
var mongoUrl = 'mongodb://localhost:27017/mqtt';
var ascoltatore = {
  //using ascoltatore 
  type: 'mongo',
  url: mongoUrl,
  pubsubCollection: 'chat',
  mongo: {}
};
 
var settings = {
  port: 1883,
   persistence: {
    factory: mosca.persistence.Mongo,
    url: mongoUrl,
  },
  backend: ascoltatore
};
 
var server = new mosca.Server(settings);
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received 
// server.on('published', function(packet, client) {
 
//  if(client!=null)
//   console.log('Published', packet.payload + ' with qos : ' + packet.qos + ' with clean :  ' + client.clean + ' retain : ' + packet.retain);
// else
//   console.log('CLIENT IS NULL')
// });

server.on('published', function(packet, client) {
    console.log('Published',packet.payload);
    if(client!==undefined&&client!==null){
        console.log("\tclient",client.id);  
    }
});

 
server.on('ready', setup);
 
// fired when the mqtt server is ready 
function setup() {
  console.log('Mosca server is up and running');
}