const mqtt = require('mqtt');

const CLIENT_IP = process.env.CLIENT_IP || "127.0.0.1";

const payload = {
  ts: new Date().getTime(),
  ip: CLIENT_IP
};

const topic = "tto/page1";

const brokers = [
  // MQTT TCP
  {
    name: "Mosquitto Public MQTT",
    url: "mqtt://test.mosquitto.org:1883"
  },

  // MQTT sécurisé TLS
  {
    name: "Mosquitto MQTTS",
    url: "mqtts://test.mosquitto.org:8883"
  },

  // WebSocket
  {
    name: "Mosquitto WS",
    url: "ws://test.mosquitto.org:8080"
  },

  // WebSocket sécurisé
  {
    name: "Mosquitto WSS",
    url: "wss://test.mosquitto.org:8081"
  },

  // HiveMQ websocket
  {
    name: "HiveMQ WS",
    url: "ws://broker.hivemq.com:8000/mqtt"
  },

  {
    name: "HiveMQ WSS",
    url: "wss://broker.hivemq.com:8884/mqtt"
  },

  // EMQX
  {
    name: "EMQX MQTT",
    url: "mqtt://broker.emqx.io:1883"
  },

  {
    name: "EMQX WSS",
    url: "wss://broker.emqx.io:8084/mqtt"
  }
];

async function testBroker(broker) {
  return new Promise((resolve) => {

    console.log(`\n=== Test ${broker.name} ===`);
    console.log(`URL: ${broker.url}`);

    const client = mqtt.connect(broker.url, {
      connectTimeout: 5000,
      reconnectPeriod: 0,
      clientId: 'test_' + Math.random().toString(16).substring(2, 10)
    });

    let done = false;

    const finish = () => {
      if (!done) {
        done = true;
        client.end(true);
        resolve();
      }
    };

    client.on('connect', () => {
      console.log('✅ Connecté');

      client.publish(
        topic,
        JSON.stringify(payload),
        { qos: 0, retain: false },
        (err) => {
          if (err) {
            console.log('❌ Erreur publication:', err.message);
          } else {
            console.log('✅ Message publié');
            console.log('Topic:', topic);
            console.log('Payload:', payload);
          }

          finish();
        }
      );
    });

    client.on('error', (err) => {
      console.log('❌ Erreur connexion:', err.message);
      finish();
    });

    client.on('close', () => {
      if (!done) {
        console.log('Connexion fermée');
        finish();
      }
    });

    setTimeout(() => {
      console.log('⏱ Timeout');
      finish();
    }, 8000);
  });
}

async function main() {

  console.log("Payload envoyé:");
  console.log(payload);

  for (const broker of brokers) {
    await testBroker(broker);
  }

  console.log("\n=== FIN ===");
}

main();