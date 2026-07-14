#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="${FRONTEND_DIR:-${ROOT_DIR}/frontend}"

IMAGE_NAME="${IMAGE_NAME:-lensora-frontend}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
CONTAINER_NAME="${CONTAINER_NAME:-lensora-frontend}"
HOST_PORT="${HOST_PORT:-8086}"
CONTAINER_PORT="${CONTAINER_PORT:-3000}"
ENV_FILE="${ENV_FILE:-${FRONTEND_DIR}/.env.production}"
NETWORK="${NETWORK:-}"
NO_CACHE="${NO_CACHE:-0}"
PULL="${PULL:-0}"

usage() {
  cat <<EOF
Deploy Lensora frontend with Docker.

Usage:
  $(basename "$0") [options]

Options:
  --port PORT           Host port to publish. Default: ${HOST_PORT}
  --image NAME          Docker image name. Default: ${IMAGE_NAME}
  --tag TAG             Docker image tag. Default: ${IMAGE_TAG}
  --name NAME           Docker container name. Default: ${CONTAINER_NAME}
  --env-file PATH       Optional env file. Default: ${ENV_FILE}
  --network NAME        Optional Docker network for the container.
  --no-cache            Build without Docker layer cache.
  --pull                Pull newer base images before building.
  -h, --help            Show this help.

Environment overrides:
  HOST_PORT=8086 IMAGE_NAME=lensora-frontend IMAGE_TAG=latest CONTAINER_NAME=lensora-frontend

Example:
  HOST_PORT=8086 $(basename "$0")
EOF
}

log() {
  printf '[deploy] %s\n' "$*"
}

fail() {
  printf '[deploy] ERROR: %s\n' "$*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

validate_port() {
  local port="$1"

  [[ "$port" =~ ^[0-9]+$ ]] || fail "Port must be numeric: $port"
  ((port >= 1 && port <= 65535)) || fail "Port must be between 1 and 65535: $port"
}

docker_container_exists() {
  docker ps -a --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"
}

assert_docker_port_available() {
  local matches

  matches="$(
    docker ps --format '{{.ID}} {{.Names}} {{.Ports}}' \
      | awk -v port=":${HOST_PORT}->" 'index($0, port) { print }'
  )"

  [[ -z "$matches" ]] || fail "Host port ${HOST_PORT} is already used by another Docker container:
${matches}"
}

assert_host_port_available() {
  if command -v lsof >/dev/null 2>&1; then
    local matches

    matches="$(lsof -nP -iTCP:"${HOST_PORT}" -sTCP:LISTEN || true)"
    [[ -z "$matches" ]] || fail "Host port ${HOST_PORT} is already listening:
${matches}"
  fi
}

wait_for_container() {
  local attempt status

  for attempt in $(seq 1 30); do
    status="$(
      docker inspect \
        --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' \
        "$CONTAINER_NAME" 2>/dev/null || true
    )"

    case "$status" in
      healthy|running)
        return 0
        ;;
      unhealthy|exited|dead)
        docker logs --tail 80 "$CONTAINER_NAME" >&2 || true
        fail "Container ${CONTAINER_NAME} status is ${status}"
        ;;
    esac

    sleep 2
  done

  docker logs --tail 80 "$CONTAINER_NAME" >&2 || true
  fail "Container ${CONTAINER_NAME} did not become ready in time"
}

while (($#)); do
  case "$1" in
    --port)
      HOST_PORT="${2:-}"
      shift 2
      ;;
    --image)
      IMAGE_NAME="${2:-}"
      shift 2
      ;;
    --tag)
      IMAGE_TAG="${2:-}"
      shift 2
      ;;
    --name)
      CONTAINER_NAME="${2:-}"
      shift 2
      ;;
    --env-file)
      ENV_FILE="${2:-}"
      shift 2
      ;;
    --network)
      NETWORK="${2:-}"
      shift 2
      ;;
    --no-cache)
      NO_CACHE=1
      shift
      ;;
    --pull)
      PULL=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      fail "Unknown option: $1"
      ;;
  esac
done

require_command docker
validate_port "$HOST_PORT"
validate_port "$CONTAINER_PORT"

[[ -d "$FRONTEND_DIR" ]] || fail "Frontend directory not found: ${FRONTEND_DIR}"
[[ -f "${FRONTEND_DIR}/Dockerfile" ]] || fail "Dockerfile not found: ${FRONTEND_DIR}/Dockerfile"

if ! docker info >/dev/null 2>&1; then
  fail "Docker daemon is not available"
fi

IMAGE_REF="${IMAGE_NAME}:${IMAGE_TAG}"

build_cmd=(docker build -f "${FRONTEND_DIR}/Dockerfile" -t "$IMAGE_REF")
[[ "$NO_CACHE" == "1" ]] && build_cmd+=(--no-cache)
[[ "$PULL" == "1" ]] && build_cmd+=(--pull)
build_cmd+=("$FRONTEND_DIR")

run_cmd=(
  docker run -d
  --name "$CONTAINER_NAME"
  --restart unless-stopped
  -p "${HOST_PORT}:${CONTAINER_PORT}"
  -e "HOSTNAME=0.0.0.0"
  -e "PORT=${CONTAINER_PORT}"
)

if [[ -n "$NETWORK" ]]; then
  run_cmd+=(--network "$NETWORK")
fi

if [[ -f "$ENV_FILE" ]]; then
  run_cmd+=(--env-file "$ENV_FILE")
else
  log "Env file not found, continuing without it: ${ENV_FILE}"
fi

run_cmd+=("$IMAGE_REF")

log "Building image ${IMAGE_REF}"
"${build_cmd[@]}"

if docker_container_exists; then
  log "Removing existing container ${CONTAINER_NAME}"
  docker rm -f "$CONTAINER_NAME" >/dev/null
fi

assert_docker_port_available
assert_host_port_available

log "Starting container ${CONTAINER_NAME} on host port ${HOST_PORT}"
"${run_cmd[@]}" >/dev/null

wait_for_container

log "Deployed ${CONTAINER_NAME}"
log "URL: http://localhost:${HOST_PORT}"
