 var mqtt = require('mqtt')
 var readline = require('readline');
 var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Read the line and publish to the subcribers
 rl.on('line', function (cmd) {
  client.publish('topic/mac1/chat', cmd,{'qos':1 , retain : false});
});

client = mqtt.createClient(1883, "localhost", {clean: false , clientId : 'mac2' , will : {topic : 'topic/mac2/status',payload : '0'}});
client.on('connect', function(){
    client.subscribe('topic/mac2/chat',{'qos' : 1});
     client.publish('topic/mac2/status', '1',{'qos':1 , retain : true});
    //Subscribing to the status of friends..!
    client.subscribe('topic/mac1/status',{'qos':1});

});

client.on('message', function(topic, message) {
	if(topic.indexOf('topic') > -1) {
	 console.log("Topic  : " + topic + " Mesaage is : " + message);
	}
});

