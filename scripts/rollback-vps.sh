#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/upgrader}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1}"

cd "$APP_DIR"

if [[ ! -f .last-good-sha ]]; then
  echo "No .last-good-sha found" >&2
  exit 1
fi

git checkout "$(cat .last-good-sha)"
export UPGRADER_IMAGE_TAG
UPGRADER_IMAGE_TAG="$(cat .last-good-image 2>/dev/null || git rev-parse --short=12 HEAD)"
docker compose up -d
./scripts/health-check.sh "$HEALTH_URL"
