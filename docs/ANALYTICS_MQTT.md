# Analytics MQTT - Documentation Complète

## Vue d'ensemble

Ce système implémente une **analytique légère basée sur MQTT** pour tracker les visites du site avec un **footprint minimal** (timestamp + adresse IP du visiteur).

### Objectif
Collecter des données basiques de visite (quand, d'où) en temps quasi-réel via MQTT sans charger une suite analytique lourde comme Google Analytics.

---

## Architecture

### Flux de Données

```
Visiteur arrive sur le site
         ↓
JavaScript s'exécute côté client
         ↓
Fetch IP depuis ipify.org (HTTPS)
         ↓
Connexion WebSocket Secure au broker MQTT
         ↓
Publication (timestamp + IP) sur topic MQTT
         ↓
Disconnection gracieuse
```

### Composants

| Composant | Description | Détails |
|-----------|-------------|---------|
| **Client MQTT** | Bibliothèque `mqtt` (v5.15.1) | Gère la connexion, pub/sub, reconnexion |
| **Broker MQTT** | test.mosquitto.org | Broker public de test sur le port 8081 (WSS) |
| **IP Resolver** | ipify.org | Détermine l'IP publique du visiteur (HTTPS) |
| **Topic MQTT** | `tto/page1` | Canal où les données sont publiées avec `retain: true` |

---

## Implémentation Technique

### Localisation du Code
📍 **Fichier:** [src/pages/index.astro](../src/pages/index.astro) (lignes 38-155)

### Payload MQTT

Chaque publication envoie un JSON minimal:

```json
{
  "ts": 1713793476123,
  "ip": "203.0.113.45"
}
```

| Champ | Type | Description |
|-------|------|-------------|
| `ts` | Number | Timestamp en millisecondes (milliseconds since epoch) |
| `ip` | String | Adresse IP publique du visiteur |

### Paramètres de Connexion

```javascript
mqtt.connect('wss://test.mosquitto.org:8081', {
  reconnectPeriod: 1000,      // Réessayer après 1s en cas de déconnexion
  connectTimeout: 10000,       // Timeout de connexion: 10s
  clean: true,                 // New session chaque fois (pas de persistent session)
})
```

### Options de Publication

```javascript
client.publish('tto/page1', payload, {
  retain: true  // Le message reste disponible pour les nouveaux subscribers
})
```

---

## Cycle de Vie & Contrôles

### Idempotence (Une seule publication par session)

Pour éviter les doublons si la page se recharge:
```javascript
if (window.__ttoMqttSent) {
  return; // Skip si déjà envoyé dans cette session navigateur
}
window.__ttoMqttSent = true; // Flag pour la session
```

### Évènements Suivis

| Événement | Signification |
|-----------|---------------|
| `SKIP` | Analytics déjà envoyées cette session |
| `FETCH_IP_START` | Démarrage de la requête vers ipify.org |
| `FETCH_IP_SUCCESS` | IP reçue avec succès |
| `FETCH_IP_ERROR` | Impossible de récupérer l'IP (timeout ou erreur HTTP) |
| `MQTT_CONNECT_START` | Tentative de connexion au broker |
| `MQTT_CONNECTED` | Connexion établie |
| `MQTT_PUBLISH_START` | Début de la publication du payload |
| `MQTT_PUBLISH_SUCCESS` | Payload publié avec succès |
| `MQTT_PUBLISH_ERROR` | Erreur lors de la publication |
| `MQTT_CONNECTION_ERROR` | Erreur de connexion (certificat, réseau, etc.) |
| `MQTT_OFFLINE` | Passage en mode offline |
| `MQTT_DISCONNECTED` | Déconnexion complète |
| `EXCEPTION` | Exception non gérée |

---

## Débogage en Production

### Objet Debug Exposé en Console

**Accès:** `window.__getMqttDebug()`

Retourne un objet structuré:

```javascript
{
  status: "success",                 // État final: initializing|success|error_*
  startTime: "2026-04-22T14:30:45.123Z",
  ipData: {                          // Données IP récupérées
    ip: "203.0.113.45",
    fetchedAt: "2026-04-22T14:30:46.234Z"
  },
  connectionDetails: {               // Détails de connexion MQTT
    connectedAt: "2026-04-22T14:30:47.345Z",
    clientId: "mqtt_abc123xyz"
  },
  publishDetails: {                  // Détails de la publication
    topic: "tto/page1",
    payload: { ts: 1713793476123, ip: "203.0.113.45" },
    publishedAt: "2026-04-22T14:30:48.456Z"
  },
  error: null,                       // Message d'erreur si applicable
  steps: [                           // Historique détaillé
    {
      timestamp: "2026-04-22T14:30:45.123Z",
      step: "START",
      message: "Starting analytics publishing"
    },
    {
      timestamp: "2026-04-22T14:30:45.234Z",
      step: "FETCH_IP_START",
      url: "https://api.ipify.org?format=json"
    },
    // ... plus d'étapes
  ]
}
```

### Commandes de Débogage en Console

```javascript
// Voir l'état complet
window.__getMqttDebug()

// Voir le statut final
window.__getMqttDebug().status

// Voir les étapes dans l'ordre
window.__getMqttDebug().steps

// Voir l'erreur si présente
window.__getMqttDebug().error

// Voir les détails de publication
window.__getMqttDebug().publishDetails

// Filtrer les étapes par type
window.__getMqttDebug().steps.filter(s => s.step.includes('PUBLISH'))

// Voir le temps total (approximatif)
const debug = window.__getMqttDebug();
new Date(debug.steps[debug.steps.length-1].timestamp) - new Date(debug.startTime)
```

---

## Problèmes Connus & Solutions

### Problème: Requête MQTT en "Pending" Infini

**Symptôme:** La connexion WebSocket reste bloquée

**Causes Possibles:**
1. ❌ **Certificat SSL invalide** - `test.mosquitto.org` peut avoir des problèmes de certificat
2. ❌ **Firewall/Proxy bloque WSS** - Votre production peut être derrière un proxy qui filtre WebSocket
3. ❌ **Broker inaccessible** - Le serveur est down ou instable

**Solutions:**
- ✅ Vérifier les logs du navigateur: `window.__getMqttDebug().error`
- ✅ Tester si `wss://test.mosquitto.org:8081` est accessible
- ✅ Vérifier la console Network: la requête WebSocket est-elle en "stuck" ou "pending"?
- ✅ Si en production, vérifier les certificats SSL et la configuration du proxy

### Problème: IP non reçue

**Symptôme:** `FETCH_IP_ERROR` dans les logs

**Causes:**
- ipify.org est indisponible
- Timeout réseau (5s)
- Blocker CORS

**Solution:** Utiliser un autre service IP:
```javascript
// Alternative: icanhazip.com, ifconfig.me, etc.
const response = await fetch('https://icanhazip.com/');
const ip = await response.text();
```

---

## Intégration avec Votre Infrastructure

### Consommation des Données MQTT

Pour lire les données publiées, vous pouvez:

1. **Via un subscriber MQTT:**
   ```bash
   mosquitto_sub -h test.mosquitto.org -p 8081 -t "tto/page1" -v
   ```

2. **Via un backend Node.js/Python:**
   ```python
   import paho.mqtt.client as mqtt
   
   def on_message(client, userdata, msg):
       print(f"Topic: {msg.topic}, Payload: {msg.payload.decode()}")
   
   client = mqtt.Client()
   client.on_message = on_message
   client.connect("test.mosquitto.org", 8881, 60)  # Note: port MQTT standard
   client.subscribe("tto/page1")
   client.loop_forever()
   ```

3. **Directement depuis la console du navigateur:**
   ```javascript
   window.__getMqttDebug().publishDetails
   ```

### Options de Broker Production

**Test:** `test.mosquitto.org` (public, pas de garantie SLA)

**Production recommandée:**
- HiveMQ Cloud (gratuit tier disponible)
- EMQX Cloud (managed MQTT)
- Auto-héberger avec Mosquitto Docker

---

## Dépendances

| Package | Version | Rôle |
|---------|---------|------|
| `mqtt` | ^5.15.1 | Client MQTT avec support WebSocket |
| `astro` | ^5.18.1 | Framework Astro (bundling du code) |

---

## Performance & Impact

### Footprint Réseau

- **Requête IP:** ~500 bytes (HTTP request + response)
- **Connexion MQTT:** ~500 bytes (handshake WebSocket)
- **Publication:** ~150 bytes (payload JSON)
- **Total:** ~1150 bytes par visite

### Timing Typique

```
IP Fetch:          ~100-300ms (dépend de ipify.org)
MQTT Connect:      ~500-1000ms (dépend du réseau)
Publish + Close:   ~100-200ms
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total:             ~700-1500ms
```

### Impact sur le Chargement de Page

**Impact minimal:**
- Script s'exécute en parallèle du rendu (async)
- Pas de blocking du reste de la page
- Timeout de 5s sur la requête IP + 10s sur MQTT

---

## Futures Améliorations

- [ ] Ajouter User-Agent au payload pour plus de contexte
- [ ] Batch multiple visitor dans un seul message
- [ ] Compresser le payload avec gzip
- [ ] Implémenter un fallback HTTP si MQTT échoue
- [ ] Dashboard pour visualiser les données en temps réel
- [ ] Respect du `Do Not Track` (DNT header)

---

## Références

- **MQTT Protocol:** https://mqtt.org/
- **mqtt.js Library:** https://github.com/mqttjs/MQTT.js
- **test.mosquitto.org:** https://test.mosquitto.org/
- **ipify API:** https://www.ipify.org/

