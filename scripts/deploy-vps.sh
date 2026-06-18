#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/upgrader}"
SHA="${1:-origin/main}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1}"

cd "$APP_DIR"
git fetch origin
git checkout "$SHA"

export UPGRADER_IMAGE_TAG
UPGRADER_IMAGE_TAG="$(git rev-parse --short=12 HEAD)"

docker compose build app
docker compose up -d

./scripts/health-check.sh "$HEALTH_URL"
echo "$UPGRADER_IMAGE_TAG" > .last-good-image
git rev-parse HEAD > .last-good-sha
