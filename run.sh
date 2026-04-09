#!/bin/bash

IMAGE_NAME="personal-site"
CONTAINER_NAME="personal-site-dev"

case "$1" in
  start)
    echo "Building image..."
    docker build -t "$IMAGE_NAME" .

    echo "Starting container..."
    docker run -d \
      --name "$CONTAINER_NAME" \
      -p 8000:8000 \
      -v "$(pwd)/src:/app/src" \
      -v "$(pwd)/data:/app/data" \
      -v "$(pwd)/static:/app/static" \
      -v "$(pwd)/gatsby-config.js:/app/gatsby-config.js" \
      -v "$(pwd)/gatsby-node.js:/app/gatsby-node.js" \
      -v "$(pwd)/gatsby-browser.js:/app/gatsby-browser.js" \
      "$IMAGE_NAME"

    echo "Container started. Site available at http://localhost:8000"
    echo "GraphQL explorer at http://localhost:8000/___graphql"
    echo ""
    echo "Logs: docker logs -f $CONTAINER_NAME"
    ;;

  stop)
    echo "Stopping container..."
    docker stop "$CONTAINER_NAME" 2>/dev/null
    docker rm "$CONTAINER_NAME" 2>/dev/null
    echo "Container stopped."
    ;;

  clean)
    echo "Stopping container..."
    docker stop "$CONTAINER_NAME" 2>/dev/null
    docker rm "$CONTAINER_NAME" 2>/dev/null
    echo "Removing image..."
    docker rmi "$IMAGE_NAME" 2>/dev/null
    echo "Clean done."
    ;;

  *)
    echo "Usage: $0 {start|stop|clean}"
    exit 1
    ;;
esac
