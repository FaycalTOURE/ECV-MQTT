let mqtt = require('mqtt');
let broker_uri = 'mqtt://localhost';
let topic_submission_string = 'chat_submission’';
let topic_reception_string = 'chat_reception';

console.log('connexion à %j ...', broker_uri);

let client = mqtt.connect(broker_uri);

client.on('connect', function () {
  console.log('connecté !');
  console.log('souscription à %j ...', topic_submission_string);

  client.subscribe(topic_submission_string, function (err) {
    if (err) {
      console.error(err)
    }
  });
});

client.on('message', function (topic, message) {
  // message contient le contenu du message est un buffer
  if (topic === topic_submission_string) {
    console.log("message reçu: %j (%s)", message.toString(), topic);
    client.publish(topic_reception_string, message.toString());
  }
});
