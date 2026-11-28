import { NextResponse } from "next/server";
import { z } from "zod";
import {
  KbQueryResponseSchema,
  LanguageSchema,
  type KbQueryResponse,
} from "@intervona/shared";

export const dynamic = "force-dynamic";

/**
 * Incoming client body `{session_id?, query, lang}`; `session_id` defaults to
 * "anonymous" and `lang` falls back to "en". The knowledge store is keyed by
 * `session_id` (the same key the prep pipeline ingests under and the Study Coach
 * retrieves with) — the shared `KbQueryRequest` names this `store_key`. This
 * route forwards to the LightRAG sidecar, whose own request model still names
 * the partition key `user_id`, so we send `user_id: session_id` below.
 */
const BodySchema = z.object({
  session_id: z.string().default("anonymous"),
  query: z.string().min(1),
  lang: LanguageSchema.catch("en").default("en"),
});

/** A grounded mock answer so the coach chat works fully offline. */
function mockAnswer(query: string): KbQueryResponse {
  const q = query.trim().replace(/\s+/g, " ");
  return {
    answer:
      `Here's a grounded take on "${q}": think in terms of the entities and ` +
      `relationships in your knowledge base. Anchor your answer in a concrete ` +
      `example, name the trade-off you're optimizing for, and cite where the ` +
      `claim comes from. (This is a sample response — connect the knowledge ` +
      `service to ground answers in your own notes and the company playbook.)`,
    citations: [
      {
        title: "Interviewing Patterns — STAR & system design",
        url: "https://example.com/kb/interviewing-patterns",
        snippet:
          "Open behavioral answers with Situation + Task; in design rounds, lead with capacity estimates before components.",
      },
      {
        title: "Company Playbook — what this team probes for",
        url: "https://example.com/kb/company-playbook",
        snippet:
          "Signals weighted highest: cross-team influence, exactly-once reasoning, and clear trade-off articulation.",
      },
    ],
  };
}

export async function POST(request: Request) {
  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  return NextResponse.json(mockAnswer(body.query));
}
