# personal-site

Site personnel statique construit avec Astro.

## Développement

### En local (Node.js 22)

```shell
npm install
npm run dev
```

Serveur de dev: http://localhost:4321

### Build production

```shell
npm run build
npm run preview
```

## Avec Docker

```shell
./run.sh dev-start      # Dev server Astro (http://localhost:4321)
./run.sh dev-logs       # Logs dev
./run.sh dev-stop       # Stop dev

./run.sh build-start    # Build + serveur statique (http://localhost:9000)
./run.sh build-logs     # Logs build/server
./run.sh build-stop     # Stop build/server
./run.sh build-only     # Build seul (sortie dans ./dist)

./run.sh stop           # Stop tous les containers
./run.sh clean-all      # Nettoyage complet (containers, images, volumes)
```

## Déploiement

Déploiement automatisé vers GitHub Pages via workflow GitHub Actions.

## Domaine

Site public: https://thierrytouin.fr

