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
docker compose exec -T app node -e '
const paths = ["/api/v1/skins?limit=1", "/api/v1/skin-prices"];
(async () => {
  for (const path of paths) {
    const started = Date.now();
    const response = await fetch(`http://127.0.0.1:3000${path}`, {
      signal: AbortSignal.timeout(90000),
    });
    await response.arrayBuffer();
    console.log(`warm-cache ${path} status=${response.status} ms=${Date.now() - started}`);
  }
})().catch((error) => {
  console.warn(`warm-cache warning: ${error.message}`);
});
'
echo "$UPGRADER_IMAGE_TAG" > .last-good-image
git rev-parse HEAD > .last-good-sha
