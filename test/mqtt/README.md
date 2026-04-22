# MQTT Analytics Test

Independent test script for the MQTT analytics publishing from the website.

## Setup

```bash
cd test/mqtt
npm install
```

## Usage

### Test (HiveMQ Public Broker - Default)

```bash
npm test
# or
npm start
```

This tests with HiveMQ's public broker:
- Broker: `wss://broker.hivemq.com:8884` (WebSocket Secure)
- No authentication required
- Topic: `tto/page1`

### Test with test.mosquitto.org (Home Assistant Configuration)

```bash
npm run test:mosquitto
```

This tests with test.mosquitto.org using Home Assistant credentials:
- Broker: `mqtt://test.mosquitto.org:1883`
- Username: `vsmqtt`
- Password: `vsmqtt`

### Test with Local Mosquitto Broker

First, start a local Mosquitto broker:

```bash
docker run -d --name mosquitto -p 1883:1883 -p 8081:8081 eclipse-mosquitto:latest
```

Then test:

```bash
npm run test:local
```

### Test with Custom Settings

```bash
node test.js <broker-url> <topic> <ip> [username] [password]
```

Examples:

```bash
node test.js wss://broker.hivemq.com:8884 tto/page1 203.0.113.45
node test.js mqtt://test.mosquitto.org:1883 tto/page1 127.0.0.1 vsmqtt vsmqtt
node test.js mqtt://localhost:1883 custom/topic 127.0.0.1
```

### Test with Custom Broker

```bash
node test.js <broker-url> <topic> <ip>
```

Example:

```bash
node test.js wss://your-instance.hivemq.cloud:8884 tto/page1 203.0.113.45
```

## Interpreting Results

### ✅ Success

```
✅ Connected successfully! (523ms)
📤 Publishing message to topic: tto/page1
✅ Message published successfully!
✅ Test completed successfully!
```

### ❌ Failure

Check the error message and consult the troubleshooting section in the output.
