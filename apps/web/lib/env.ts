/**
 * Environment accessors. Read lazily — NEVER throw at import/build time so the
 * app builds and renders with zero configured keys (offline / provider-agnostic).
 *
 * Public values MUST use static `process.env.NEXT_PUBLIC_*` references so Next.js
 * can inline them into the browser bundle. Dynamic indexing is undefined client-side.
 */

/** Browser-safe public config. Inlined by Next at build time. */
export const publicEnv = {
  get appUrl(): string {
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  },
};

/** Server-only config. Never imported into client components. */
export const serverEnv = {
  get awsRegion(): string | undefined {
    return process.env.AWS_REGION || undefined;
  },
  get awsS3Bucket(): string | undefined {
    return process.env.AWS_S3_BUCKET || undefined;
  },
  get awsAccessKeyId(): string | undefined {
    return process.env.AWS_ACCESS_KEY_ID || undefined;
  },
  get awsSecretAccessKey(): string | undefined {
    return process.env.AWS_SECRET_ACCESS_KEY || undefined;
  },
  get awsS3PublicUrl(): string | undefined {
    return process.env.AWS_S3_PUBLIC_URL || undefined;
  },
  get livekitUrl(): string | undefined {
    return process.env.LIVEKIT_URL || undefined;
  },
  get livekitApiKey(): string | undefined {
    return process.env.LIVEKIT_API_KEY || undefined;
  },
  get livekitApiSecret(): string | undefined {
    return process.env.LIVEKIT_API_SECRET || undefined;
  },
  /**
   * Dispatch name the voice worker registers under (`agent_name`).
   * Must match the worker's `LIVEKIT_AGENT_NAME` so the token's explicit
   * `roomConfig.agents` dispatch actually routes to it (issue #67: without an
   * explicit dispatch the interviewer never joins — LiveKit reports the room
   * as healthy and the UI sits on "Connecting your interviewer…" forever).
   */
  get livekitAgentName(): string {
    return process.env.LIVEKIT_AGENT_NAME || "intervona-interviewer";
  },
  get agentApiUrl(): string {
    return process.env.AGENT_API_URL || "http://localhost:8000";
  },
  /** Shared secret for the agent API's guarded write endpoints (opt-in). */
  get internalApiSecret(): string | undefined {
    return process.env.INTERNAL_API_SECRET || undefined;
  },
};

/** True when LiveKit URL + API credentials are all present. */
export function isLiveKitConfigured(): boolean {
  return Boolean(
    serverEnv.livekitUrl &&
    serverEnv.livekitApiKey &&
    serverEnv.livekitApiSecret,
  );
}

/** True only when complete AWS S3 credentials and a bucket are configured. */
export function isS3Configured(): boolean {
  return Boolean(
    serverEnv.awsRegion &&
    serverEnv.awsS3Bucket &&
    serverEnv.awsAccessKeyId &&
    serverEnv.awsSecretAccessKey,
  );
}
