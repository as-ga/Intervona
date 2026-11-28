# Intervona Agent

The agent is a Python service for CV and job analysis, interview preparation,
LiveKit voice sessions, scoring, and reports.

## Source Layout

```text
src/
├── app.py
├── worker.py
├── api/
├── coach/
├── core/
├── live/
├── post/
└── prep/
```

The source directory is intentionally flat. Imports use modules from `src`,
for example `app:app`, `api.prep`, and `worker`.

## Development

Run the agent from the repository root:

```bash
pnpm run dev
```

Or run each process directly:

```bash
cd apps/agent
set -a && . ../../.env && set +a
PYTHONPATH=src .venv/bin/uvicorn app:app --host 127.0.0.1 --port 8000
PYTHONPATH=src .venv/bin/python src/worker.py start
```

## Docker

```bash
docker build -f apps/agent/Dockerfile -t intervona-agent .
docker run --rm -p 8000:8000 --env-file .env intervona-agent
```
