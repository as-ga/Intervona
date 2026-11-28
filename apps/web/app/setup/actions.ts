"use server";

import type { PrepRequest } from "@intervona/shared";
import { requestPrep } from "@/lib/api";

export type StartSessionResult =
  { ok: true; session_id: string } | { ok: false; error: string };

export async function startSession(
  input: PrepRequest
): Promise<StartSessionResult> {
  try {
    const { session_id } = await requestPrep(input);
    return { ok: true, session_id };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not reach the prep service.";
    return { ok: false, error: message };
  }
}
