#!/usr/bin/env node

/**
 * MQTT Analytics Tester - Independent Test Script
 * 
 * Simulates the analytics publishing from the website
 * Tests with public MQTT brokers
 * 
 * Usage:
 *   node test.js [broker-url] [topic] [ip]
 *   node test.js wss://broker.hivemq.com:8884 tto/page1 127.0.0.1
 *   node test.js mqtt://localhost:1883 tto/page1 127.0.0.1
 * 
 * npm scripts:
 *   npm start                # Test with HiveMQ public broker
 *   npm test                 # Same as above
 *   npm run test:mosquitto   # Test with test.mosquitto.org (with credentials)
 *   npm run test:local       # Test local broker
 */

const mqtt = require('mqtt');

// Configuration from command line or defaults
// Using HiveMQ public broker (wss, no authentication required)
const BROKER_URL = process.argv[2] || 'wss://broker.emqx.io:8084/mqtt';
const TOPIC = process.argv[3] || 'tto/page1';
const CLIENT_IP = process.argv[4] || '127.0.0.1';
const USERNAME = process.argv[5] || '';
const PASSWORD = process.argv[6] || '';

console.log('\n' + '='.repeat(70));
console.log('MQTT Analytics Test - Simulating Website Publishing');
console.log('='.repeat(70) + '\n');

console.log('📋 Configuration:');
console.log(`   Broker URL: ${BROKER_URL}`);
console.log(`   Topic: ${TOPIC}`);
console.log(`   Test IP: ${CLIENT_IP}`);
if (USERNAME) {
  console.log(`   Username: ${USERNAME}`);
  console.log(`   Password: ${'*'.repeat(PASSWORD.length)}`);
}
console.log('');

// Create the payload (exactly like analytics on the website)
const payload = {
  ts: new Date().getTime(),
  ip: CLIENT_IP
};

console.log('📦 Payload to publish:');
console.log(JSON.stringify(payload, null, 2));
console.log('');

console.log('🔗 Connecting to broker...');

const connectStartTime = Date.now();
const connectionAttempts = [];

const client = mqtt.connect(BROKER_URL, {
  reconnectPeriod: 0,      // No auto-reconnect
  connectTimeout: 5000,     // 5 second timeout
  clean: true,              // New session
  clientId: `mqtt_test_${Date.now()}`,
  ...(USERNAME && { username: USERNAME }),
  ...(PASSWORD && { password: PASSWORD }),
  rejectUnauthorized: false // For testing with self-signed certs
});

// Track connection attempt
connectionAttempts.push({
  timestamp: new Date().toISOString(),
  stage: 'CONNECT_INITIATED'
});

// Handle successful connection
client.on('connect', () => {
  const connectTime = Date.now() - connectStartTime;
  
  connectionAttempts.push({
    timestamp: new Date().toISOString(),
    stage: 'CONNECTED',
    duration_ms: connectTime
  });

  console.log(`✅ Connected successfully! (${connectTime}ms)`);
  console.log('');
  console.log(`📤 Publishing message to topic: ${TOPIC}`);

  // Publish the payload
  client.publish(TOPIC, JSON.stringify(payload), { retain: true }, (err) => {
    if (err) {
      console.error(`❌ Publish error:`, err.message);
      connectionAttempts.push({
        timestamp: new Date().toISOString(),
        stage: 'PUBLISH_ERROR',
        error: err.message
      });
    } else {
      console.log('✅ Message published successfully!');
      
      connectionAttempts.push({
        timestamp: new Date().toISOString(),
        stage: 'PUBLISHED',
        topic: TOPIC,
        payload: payload
      });
    }

    // Disconnect after a short delay
    console.log('');
    console.log('🔌 Disconnecting...');
    client.end(() => {
      connectionAttempts.push({
        timestamp: new Date().toISOString(),
        stage: 'DISCONNECTED'
      });

      console.log('✅ Disconnected');
      console.log('');
      console.log('📊 Connection Log:');
      console.log(JSON.stringify(connectionAttempts, null, 2));
      console.log('');
      console.log('✅ Test completed successfully!\n');
      process.exit(0);
    });
  });
});

// Handle connection errors
client.on('error', (error) => {
  connectionAttempts.push({
    timestamp: new Date().toISOString(),
    stage: 'CONNECTION_ERROR',
    error: error.message,
    code: error.code
  });

  console.error('❌ Connection Error:', error.message);
  console.error('Code:', error.code);
  console.error('');
  console.error('📊 Connection Attempts:');
  console.log(JSON.stringify(connectionAttempts, null, 2));
  console.error('');
  console.error('❌ Test failed!');
  console.error('');
  console.error('🔍 Troubleshooting:');
  console.error('');
  console.error('1. Check broker accessibility:');
  console.error(`   curl -v ${BROKER_URL}`);
  console.error('');
  console.error('2. If using wss://, check SSL certificate:');
  console.error(`   openssl s_client -connect test.mosquitto.org:8081 -showcerts`);
  console.error('');
  console.error('3. Try local broker instead:');
  console.error('   docker run -d --name mosquitto -p 1883:1883 -p 8081:8081 eclipse-mosquitto');
  console.error('   npm run test:local');
  console.error('');
  console.error('4. Check firewall/proxy settings blocking WebSocket');
  console.error('');
  
  process.exit(1);
});

// Handle offline event
client.on('offline', () => {
  connectionAttempts.push({
    timestamp: new Date().toISOString(),
    stage: 'OFFLINE'
  });
  console.log('⚠️  Client went offline');
});

// Handle close event
client.on('close', () => {
  connectionAttempts.push({
    timestamp: new Date().toISOString(),
    stage: 'CLOSED'
  });
  console.log('Connection closed');
});

// Timeout if nothing happens after 15 seconds
setTimeout(() => {
  console.error('');
  console.error('❌ Timeout: No response from broker after 15 seconds');
  console.error('');
  console.error('Connection attempts:');
  console.log(JSON.stringify(connectionAttempts, null, 2));
  
  client.end(true);
  process.exit(1);
}, 15000);
