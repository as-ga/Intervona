#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."
if [[ -f ../../.env ]]; then
  set -a
  . ../../.env
  set +a
fi

exec pnpm exec next dev --hostname 127.0.0.1 --port 3000
