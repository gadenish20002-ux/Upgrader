#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-${UPGRADER_HEALTH_URL:-http://127.0.0.1}}"

curl --fail --silent --show-error "$BASE_URL/" >/dev/null
curl --fail --silent --show-error "$BASE_URL/api/state" >/dev/null
curl --fail --silent --show-error "$BASE_URL/api/v1/skins?limit=1" >/dev/null
curl --fail --silent --show-error "$BASE_URL/api/v1/stats" >/dev/null

echo "health-ok $BASE_URL"
