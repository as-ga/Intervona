#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -f .env ]]; then
  set -a
  . ./.env
  set +a
fi

is_enabled() {
  case "${1:-false}" in
    1 | true | TRUE | yes | YES | on | ON) return 0 ;;
    0 | false | FALSE | no | NO | off | OFF | "") return 1 ;;
    *)
      echo "Invalid boolean value: $1" >&2
      echo "Use true/false, 1/0, yes/no, or on/off." >&2
      exit 2
      ;;
  esac
}

profiles=()
enabled_services=()
disabled_services=()

select_service() {
  local service="$1"
  local value="$2"
  if is_enabled "$value"; then
    profiles+=(--profile "$service")
    enabled_services+=("$service")
  else
    disabled_services+=("$service")
  fi
}

select_service ollama "${DOCKER_OLLAMA:-false}"
select_service postgres "${DOCKER_POSTGRES:-true}"
select_service whisper "${DOCKER_WHISPER:-true}"
select_service kokoro "${DOCKER_KOKORO:-true}"
select_service livekit "${DOCKER_LIVEKIT:-true}"

action="${1:-up}"
case "$action" in
  up)
    if ((${#disabled_services[@]})); then
      docker compose stop "${disabled_services[@]}"
    fi
    if ((${#enabled_services[@]})); then
      docker compose "${profiles[@]}" up -d
    fi
    echo "Docker enabled: ${enabled_services[*]:-(none)}"
    echo "Docker disabled: ${disabled_services[*]:-(none)}"
    ;;
  stop)
    if ((${#enabled_services[@]})); then
      docker compose "${profiles[@]}" stop "${enabled_services[@]}"
    fi
    ;;
  status)
    docker compose "${profiles[@]}" ps --all
    ;;
  *)
    echo "Usage: $0 {up|stop|status}" >&2
    exit 2
    ;;
esac
