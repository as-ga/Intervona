/**
 * Avatar persona catalog.
 *
 * WP-1 created the stub (`id`/`name`/`style`/`poster_url`). WP-9 extends each
 * entry with the pre-rendered Veo 3.1 loop URLs (`idle_url` + `speaking_url`)
 * consumed by `<AvatarStage>`.
 *
 * The paths below are PLACEHOLDERS — no real assets exist yet, so every URL
 * 404s. That is intentional: `<AvatarStage>` renders a tasteful fallback stage
 * until `scripts/veo/render.mjs` produces real MP4s and the printed R2 URLs are
 * pasted in here (see `scripts/veo/README.md`).
 *
 * Pure data — no `server-only`, no env reads — safe to import from any server
 * or client component.
 */

/** Stable persona ids used across the pipeline and the Veo render scripts. */
export type PersonaId = "arjun" | "ananya";

export interface Persona {
  /** Stable id sent through the interview pipeline. */
  id: PersonaId;
  /** Display name shown on the picker card. */
  name: string;
  /** One-line interviewer style/tone, surfaced under the name. */
  style: string;
  /** Poster image path — first frame of the idle loop (placeholder). */
  poster_url: string;
  /** Idle / listening / thinking loop (subtle breathing, blink). Placeholder. */
  idle_url: string;
  /** Speaking loop (talking mouth, nods, gestures). Placeholder. */
  speaking_url: string;
  /** Optional contribution credit, e.g. "rendered by @user with Sora 2".
   * Shown in the avatar gallery / release notes (see docs/AVATARS.md). */
  credit?: string;
}

export const PERSONAS: Persona[] = [
  {
    id: "arjun",
    name: "Arjun",
    style: "Male interviewer — calm, structured, and technically precise.",
    poster_url: "/avatars/arjun.png",
    idle_url: "/avatars/arjun-idle.mp4",
    speaking_url: "/avatars/arjun-speaking.mp4",
  },
  {
    id: "ananya",
    name: "Ananya",
    style: "Female interviewer — warm, focused, and naturally conversational.",
    poster_url: "/avatars/ananya.png",
    idle_url: "/avatars/ananya-idle.mp4",
    speaking_url: "/avatars/ananya-speaking.mp4",
  },
];

/** Default persona when the user hasn't picked one yet. */
export const DEFAULT_PERSONA_ID = "arjun";

/** Look up a persona by id, falling back to the default. */
export function getPersona(id: string | undefined): Persona {
  const fallback =
    PERSONAS.find((p) => p.id === DEFAULT_PERSONA_ID) ?? PERSONAS[0];
  // The catalog is always non-empty, so a fallback exists.
  return PERSONAS.find((p) => p.id === id) ?? (fallback as Persona);
}
