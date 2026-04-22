# Analytics MQTT - Documentation Complète

## Vue d'ensemble

Ce système implémente une **analytique légère basée sur MQTT** pour tracker les visites du site avec un **footprint minimal** (timestamp + adresse IP du visiteur).

### Objectif
Collecter des données basiques de visite (quand, d'où) en temps quasi-réel via MQTT sans charger une suite analytique lourde comme Google Analytics.

### 🧪 Tester l'Analytics

Un **projet de test indépendant** est disponible dans [test/mqtt/](../test/mqtt/) pour valider la configuration MQTT sans toucher au site.

```bash
cd test/mqtt
npm install
npm run test:public      # Test avec broker public
npm run test:local       # Test avec broker local

# Ou via run.sh
./run.sh tester-start
```

Pour plus de détails, voir [test/mqtt/README.md](../test/mqtt/README.md).

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
📍 **Fichier:** [src/pages/index.astro](../src/pages/index.astro) (scripts)

### Architecture: Migration de Gatsby à Astro

**En Gatsby (Ancien):**
```javascript
// Composant React avec useEffect - Garantit exécution côté client après hydration
const MqttComponent = () => {
  useEffect(() => {
    publishVisitorIp();
  }, []);
};
```

**En Astro (Actuel):**
```astro
<!-- Script 1: is:inline - Initialisation côté client -->
<script is:inline>
  window.__mqttDebug = { ... };
</script>

<!-- Script 2: avec module MQTT - Exécution sur DOMContentLoaded -->
<script>
  import mqtt from 'mqtt';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', publishVisitorIp);
  } else {
    publishVisitorIp();
  }
</script>
```

**Différences Clés:**
- ✅ **is:inline:** Garantit exécution côté client AVANT les modules
- ✅ **DOMContentLoaded:** Attendu que le DOM soit prêt (comme `useEffect`)
- ✅ **Deux scripts:** Séparation init/exécution pour éviter SSR

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
  reconnectPeriod: 0,         // DÉSACTIVÉ: pas de reconnexion infinie
  connectTimeout: 5000,       // Timeout de connexion: 5s (réduit)
  clean: true,                // New session chaque fois (pas de persistent session)
})
```

**Logique de Retry Manuel:**
- Maximum 3 tentatives de connexion
- Arrêt forcé après max retries pour éviter boucle infinie
- Chaque tentative loggée avec `connectionAttempts`

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
| `MQTT_MAX_RETRIES_REACHED` | 3 tentatives échouées - arrêt des reconnexions |
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

## Historique & Debugging

### Migration Gatsby → Astro (Avril 2026)

**Avant (15 avril):** ✅ Fonctionnait en Gatsby
```javascript
import MqttComponent from '../components/mqtt/mqtt-page1';
// ...
<MqttComponent /> // Exécution garantie côté client via React useEffect
```

**Après Migration:** ❌ Cassé en Astro 
- Code s'exécutait en SSR ou trop tôt
- Module MQTT échouait silencieusement
- Pas de fallback côté client

**Solution Appliquée:**
1. **Séparation en deux scripts** pour éviter SSR
2. **`is:inline`** pour garantir exécution client pur
3. **`DOMContentLoaded`** pour synchroniser avec le DOM
4. **Instrumentation complète** pour déboguer les futures migrations

---

## Problèmes Connus & Solutions

### Problème: Boucle Infinie de Reconnexion MQTT ⚠️

**Symptôme:** La console affiche `MQTT_CLOSE` et `WebSocket connection failed` en boucle infinie

**Cause Racine:** 
La connexion WebSocket au broker échoue **immédiatement** et sans limite de retry. Cela se produit quand:
- ❌ Le broker `test.mosquitto.org:8081` **n'est pas accessible** depuis votre réseau
- ❌ Certificat SSL/TLS invalide (problème très courant avec test.mosquitto.org)
- ❌ Firewall/Proxy bloque les connexions WSS
- ❌ Broker down ou surchargé

**Diagnostic en Console:**

```javascript
// Voir l'erreur exacte
window.__getMqttDebug().error

// Voir les tentatives de reconnexion
window.__getMqttDebug().steps.filter(s => s.step.includes('CONNECTION'))

// Voir le nombre de tentatives
window.__getMqttDebug().steps.filter(s => s.step === 'MQTT_CONNECTION_ERROR').length
```

**Solutions:**

1. **Test rapide du broker** - Vérifier si l'endpoint est accessible:
   ```bash
   # Depuis votre terminal
   curl -v -N https://test.mosquitto.org:8081/
   ```
   Si ça timeout ou retourne erreur SSL → Le broker est inaccessible

2. **Passer à un broker fiable** (recommandé pour production):
   ```javascript
   // Option 1: HiveMQ Cloud (gratuit tier)
   const brokerUrl = 'wss://your-instance.hivemq.cloud:8884';
   
   // Option 2: EMQX Cloud
   const brokerUrl = 'wss://your-broker.emqxcloud.com:8883';
   
   // Option 3: Auto-hébergé avec Docker
   // docker run -p 1883:1883 -p 8081:8081 eclipse-mosquitto:latest
   const brokerUrl = 'wss://your-server.com:8081';
   ```

3. **Fallback HTTP si WSS échoue** (dégradation gracieuse):
   ```javascript
   // À implémenter: POST vers votre backend à la place
   const response = await fetch('/api/analytics', {
     method: 'POST',
     body: JSON.stringify({ ts: new Date().getTime(), ip })
   });
   ```

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

