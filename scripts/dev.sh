#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Reconcile env-selected infrastructure before starting processes that connect
# to it. This prevents a confusing asyncio Connect call failed traceback when,
# for example, DOCKER_POSTGRES=true but its container is still stopped.
bash scripts/docker-services.sh up

set -a
. ./.env
set +a

case "${DOCKER_OLLAMA:-false}" in
  1 | true | TRUE | yes | YES | on | ON)
    export OLLAMA_BASE_URL="http://localhost:11435/v1"
    ;;
esac

exec turbo run dev --parallel
