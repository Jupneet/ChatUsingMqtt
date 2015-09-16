var mosca = require('mosca');
var mongoUrl = 'mongodb://localhost:27017/mqtt';

var backendSettings = {
  //using ascoltatore
  type: 'mongo',
  url: mongoUrl,
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var persistenceOpts = {
    url:'mongodb://localhost/mqttPersistence'
}

var settings = {
  port: 1883,
  backend: backendSettings
};

var server = new mosca.Server(settings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

server.on('delivered', function(packet,client) {
    console.log('delivered', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published',packet.topic);
});

// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
  console.log('clientDisconnected : ', client.id);
});

server.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}

var onPersistenceReady = function()
{
    console.log('Persistence Ready');
    persistence.wire(server);
}
var persistence = mosca.persistence.Mongo(persistenceOpts, onPersistenceReady );

