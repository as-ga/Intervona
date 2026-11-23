#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."
set -a
. ../../.env
set +a

PYTHONPATH=src ./.venv/bin/uvicorn app:app \
  --host 127.0.0.1 --port 8000 &
API_PID=$!

PYTHONPATH=src ./.venv/bin/python src/worker.py start &
WORKER_PID=$!

cleanup() {
  kill "$WORKER_PID" "$API_PID" 2>/dev/null || true
  wait "$WORKER_PID" "$API_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

while kill -0 "$API_PID" 2>/dev/null && kill -0 "$WORKER_PID" 2>/dev/null; do
  sleep 1
done
