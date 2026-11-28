FROM node:22-slim AS deps

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable
WORKDIR /repo

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN pnpm install --frozen-lockfile

FROM node:22-slim AS builder

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_APP_URL=http://localhost:3000
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN corepack enable
WORKDIR /repo

COPY --from=deps /repo/node_modules ./node_modules
COPY . .

RUN pnpm --filter @intervona/shared build
RUN pnpm --filter @intervona/web build

FROM node:22-slim AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY --from=builder --chown=node:node /repo/node_modules /app/node_modules
COPY --from=builder --chown=node:node /repo/apps/web /app/apps/web
COPY --from=builder --chown=node:node /repo/packages/shared /app/packages/shared

WORKDIR /app/apps/web

USER node
EXPOSE 3000

CMD ["./node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
