# Intervona

Intervona is a local-first AI interview practice platform. It turns a CV and job
description into an adaptive voice interview, then produces a scored report.

## Requirements

- Docker
- Node.js 20 or newer
- pnpm 11
- Python 3.12
- uv

## Quick Start

```bash
cp .env.example .env

docker compose up -d
docker compose run --rm ollama-pull

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
| Ollama | http://localhost:11435 |
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

Build and run the application containers:

```bash
docker build -f apps/agent/Dockerfile -t intervona-agent .
docker build -f apps/web/Dockerfile -t intervona-web .
```

No external AI API key is required for the local Ollama, Whisper, Kokoro,
PostgreSQL, and LiveKit stack.
