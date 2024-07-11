import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MqttComponent = () => {

  useEffect(() => {


    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        
        console.log("1- ip='" + data.ip + "'");

        return data.ip; 

      } catch (error) {
        console.error('Error fetching the IP address:', error);
      }
    };


    fetchIP().then((ip) => {
      console.log("2- ip='" + ip + "'");

      // Configuration de la connexion MQTT
      const client = mqtt.connect('wss://test.mosquitto.org:8081');

      // Gestion des événements de connexion et de message
      client.on('connect', () => {
        // console.log('Connecté au broker MQTT');

        // Publier un message
        var send_msg = {
          'ts': new Date().getTime(),
          'ip': ip
        }

        client.publish('tto/page1', JSON.stringify(send_msg)  , { retain: true });

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


    });




  }, []);

  return <div></div>;
};

export default MqttComponent;
