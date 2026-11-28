# Intervona

Intervona is a local-first AI interview practice platform. It turns a CV and job
description into an adaptive voice interview, then produces a scored report.

## Requirements

- Docker
- Node.js 20 or newer
- pnpm 11
- Python 3.12
- uv
- Ollama for macOS (`brew install ollama`)

## Quick Start

```bash
cp .env.example .env

pnpm docker:up
brew services start ollama
ollama pull qwen3:1.7b

pnpm install
pnpm run dev
```

Open http://localhost:3000.

The development command starts:

- Web at http://localhost:3000
- Agent API at http://localhost:8000
- LiveKit agent worker

## Local Services

| Service | URL |
| --- | --- |
| Ollama (native, Metal accelerated) | http://localhost:11434 |
| Whisper | http://localhost:8001 |
| Kokoro | http://localhost:8880 |
| LiveKit | ws://localhost:7880 |
| PostgreSQL | localhost:55432 |

PostgreSQL is managed by Docker by default:

```env
DATABASE_URL=postgresql+asyncpg://intervona:intervona@localhost:55432/intervona
```

To use an external PostgreSQL server, replace `DATABASE_URL` in `.env`:

```env
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE
```

No manual migration command is required. On the first database operation,
SQLAlchemy creates any missing tables declared in the ORM metadata. Point
`DATABASE_URL` at either Docker or external PostgreSQL, then start the app.

## Storage

Uploaded CV files use AWS S3 only when these variables are set:

```env
AWS_REGION=
AWS_S3_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_PUBLIC_URL=
```

Without AWS credentials, uploads are stored in `uploads/`.

## Docker

Select Docker-managed services in `.env`:

```env
DOCKER_OLLAMA=true
DOCKER_POSTGRES=true
DOCKER_WHISPER=true
DOCKER_KOKORO=true
DOCKER_LIVEKIT=true
```

Then reconcile the running containers with those values:

```bash
pnpm docker:up
pnpm docker:status
pnpm docker:stop
```

`pnpm docker:up` starts enabled services and stops disabled services. With
`DOCKER_OLLAMA=false`, use native Ollama on port 11434 for Apple Metal. With
`DOCKER_OLLAMA=true`, the dev command automatically uses Docker Ollama on port
11435.

Build and run the application containers:

```bash
docker build -f apps/agent/Dockerfile -t intervona-agent .
docker build -f apps/web/Dockerfile -t intervona-web .
```

No external AI API key is required for the local Ollama, Whisper, Kokoro,
PostgreSQL, and LiveKit stack.

Docker Ollama remains available as the slower CPU-only fallback:

```bash
# First set DOCKER_OLLAMA=true in .env, then:
pnpm docker:up
```
