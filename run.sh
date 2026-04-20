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
  dev-start)
    echo "Building and starting dev server..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --build dev
    echo ""
    echo "Site available at http://localhost:4321"
    echo "Logs: $0 dev-logs"
    ;;

  dev-stop)
    echo "Stopping dev container..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" stop dev
    echo "Container stopped."
    ;;

  dev-logs)
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" logs -f dev
    ;;

  build-start)
    echo "Building & serving static site..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --build build
    echo ""
    echo "Build + serve at http://localhost:9000"
    echo "Logs: $0 build-logs"
    ;;

  build-only)
    echo "Building static site..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" run --rm build sh -c "npx astro build"
    echo ""
    echo "Build complete. Output in ./dist/"
    ;;

  build-stop)
    echo "Stopping build container..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" stop build
    echo "Container stopped."
    ;;

  build-logs)
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" logs -f build
    ;;

  stop)
    echo "Stopping all containers..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down --remove-orphans
    echo "All containers stopped."
    ;;

  clean-all)
    echo "Stopping containers and removing all images/volumes..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down --rmi all --volumes --remove-orphans
    # Force remove any remaining containers
    docker container rm -f personal-site-dev 2>/dev/null || true
    docker container rm -f personal-site-build 2>/dev/null || true
    echo "Clean done."
    ;;

  *)
    echo ""
    echo "  🚀 Personal Site — Docker Toolbox (Astro)"
    echo "  ──────────────────────────────────────────────"
    echo ""
    echo "  📦 Dev Server (Astro dev, hot-reload)"
    echo "     dev-start         Build & lance le site        → http://localhost:4321"
    echo "     dev-stop          Arrête le container dev"
    echo "     dev-logs          Affiche les logs en continu"
    echo ""
    echo "  🌐 Build (Production build + serve)"
    echo "     build-start       Build + serveur statique     → http://localhost:9000"
    echo "     build-only        Build seul (résultat dans ./dist/)"
    echo "     build-stop        Arrête le container de build"
    echo "     build-logs        Affiche les logs en continu"
    echo ""
    echo "  🧹 Maintenance"
    echo "     stop              Arrête tous les containers"
    echo "     clean-all         Supprime containers, images & volumes"
    echo ""
    echo "  Usage: $0 <commande>"
    echo ""
    exit 1
    ;;
esac
