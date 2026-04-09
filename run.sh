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
  start)
    echo "Building and starting runtime service..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --build run
    echo ""
    echo "Site available at http://localhost:8000"
    echo "GraphQL explorer at http://localhost:8000/___graphql"
    echo "Logs: $DOCKER_COMPOSE -f $COMPOSE_FILE logs -f run"
    echo "Dev shell: $DOCKER_COMPOSE -f $COMPOSE_FILE run --rm dev"
    ;;

  shell)
    echo "Opening development shell..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" run --rm dev
    ;;

  stop)
    echo "Stopping containers..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down --remove-orphans
    echo "Containers stopped."
    ;;

  clean)
    echo "Stopping containers and removing images/volumes..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down --rmi all --volumes --remove-orphans
    echo "Clean done."
    ;;

  *)
    echo "Usage: $0 {start|stop|clean|shell}"
    exit 1
    ;;
esac
