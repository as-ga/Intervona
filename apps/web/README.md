# Intervona Web

The web application is a Next.js App Router interface for setup, interview
preparation, live voice sessions, and reports.

## Development

Run the complete project from the repository root:

```bash
pnpm run dev
```

The web app is available at http://localhost:3000.

For web-only development:

```bash
cd apps/web
pnpm dev
```

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -f apps/web/Dockerfile \
  -t intervona-web \
  .

docker run --rm -p 3000:3000 --env-file .env intervona-web
```

Public configuration is compiled during the Next.js build. Agent and local
service endpoints are resolved server-side at runtime.
