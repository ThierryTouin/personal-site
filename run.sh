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

  clean-all)
    echo "Stopping containers and removing all images/volumes..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down --rmi all --volumes --remove-orphans
    echo "Clean done."
    ;;

  *)
    echo "Usage: $0 {site-start|site-stop|site-logs|builder-start|builder-shell|builder-stop|clean-all}"
    exit 1
    ;;
esac
