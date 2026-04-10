#!/bin/bash

set -e

COMPOSE_FILE="docker-compose.yml"

if docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker-compose"
else
  echo "Docker Compose is required (docker compose or docker-compose)."
  exit 1
fi

case "$1" in
  site-start)
    echo "Building and starting site..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --build run
    echo ""
    echo "Site available at http://localhost:8000"
    echo "GraphQL explorer at http://localhost:8000/___graphql"
    echo "Logs: $0 site-logs"
    ;;

  site-stop)
    echo "Stopping containers..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down --remove-orphans
    echo "Containers stopped."
    ;;

  site-logs)
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" logs -f run
    ;;

  builder-start)
    echo "Starting builder environment..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --build builder
    echo "Builder started. Use '$0 builder-shell' to open a shell."
    ;;

  builder-shell)
    echo "Opening builder shell..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" exec builder bash 2>/dev/null \
      || $DOCKER_COMPOSE -f "$COMPOSE_FILE" run --rm builder
    ;;

  builder-stop)
    echo "Stopping builder..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" stop builder
    echo "Builder stopped."
    ;;

  static-build)
    echo "Building static site..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" run --rm static-build sh -c "npm install --legacy-peer-deps && npm run build"
    echo ""
    echo "Build complete. Output in ./public/"
    echo "Push to GitHub to deploy via GitHub Pages."
    ;;

  static-serve)
    echo "Building & serving static site..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" run --rm --service-ports static-build
    ;;

  static-stop)
    echo "Stopping static-build container..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" stop static-build
    echo "Container stopped."
    ;;

  clean-all)
    echo "Stopping containers and removing all images/volumes..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down --rmi all --volumes --remove-orphans
    echo "Clean done."
    ;;

  *)
    echo ""
    echo "  🚀 Personal Site — Docker Toolbox"
    echo "  ──────────────────────────────────────────────"
    echo ""
    echo "  📦 Dev Server (Gatsby develop, hot-reload)"
    echo "     site-start        Build & lance le site        → http://localhost:8000"
    echo "     site-stop         Arrête tous les containers"
    echo "     site-logs         Affiche les logs en continu"
    echo ""
    echo "  🔧 Builder (Shell interactif Node.js)"
    echo "     builder-start     Démarre le container builder"
    echo "     builder-shell     Ouvre un shell bash dans le builder"
    echo "     builder-stop      Arrête le builder"
    echo ""
    echo "  🌐 Static Build (Build de production)"
    echo "     static-build      Build seul (résultat dans ./public/)"
    echo "     static-serve      Build + serveur statique     → http://localhost:9000"
    echo "     static-stop       Arrête le container de build"
    echo ""
    echo "  🧹 Maintenance"
    echo "     clean-all         Supprime containers, images & volumes"
    echo ""
    echo "  Usage: $0 <commande>"
    echo ""
    exit 1
    ;;
esac
