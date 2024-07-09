import React, { useEffect } from 'react';
import mqtt from 'mqtt';

const MqttComponent = () => {
  useEffect(() => {
    // Configuration de la connexion MQTT
    const client = mqtt.connect('wss://test.mosquitto.org:8081');

    // Gestion des événements de connexion et de message
    client.on('connect', () => {
      console.log('Connecté au broker MQTT');

      // Publier un message
      var ts = ''+ new Date().getTime();
      client.publish('tto/page1', ts , { retain: true });
    });

    client.on('error', (error) => {
      console.error('Erreur de connexion MQTT:', error);
    });

    // Nettoyage à la déconnexion
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return <div></div>;
};

export default MqttComponent;
