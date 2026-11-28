import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { presignS3Upload } from "@/lib/s3";
import { isS3Configured } from "@/lib/env";

// CV uploads only. Allowlist the document types the prep extractor can read
// (markitdown handles PDF/DOCX); reject everything else so the bucket can't be
// used as open file hosting.
const ALLOWED_CONTENT_TYPES = new Set([
  "application/pdf",
  "application/x-pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
  "text/markdown",
]);

// Hard ceiling on a presigned CV upload (bytes). A résumé is a few hundred KB;
// 10 MB is generous headroom without inviting storage abuse.
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const BodySchema = z.object({
  filename: z.string().min(1),
  content_type: z.string().min(1),
  // Client reports the byte size so we can bound it and bind it into the
  // signature; the presigned PUT then has to match it exactly.
  size: z.number().int().positive().max(MAX_UPLOAD_BYTES),
});

export async function POST(request: Request) {
  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const normalizedType = (body.content_type.split(";", 1)[0] ?? "")
    .trim()
    .toLowerCase();
  if (!ALLOWED_CONTENT_TYPES.has(normalizedType)) {
    return NextResponse.json(
      { error: "Unsupported file type. Upload a PDF, DOCX, or text CV." },
      { status: 415 },
    );
  }

  // Random, unguessable key segment (not a millisecond timestamp) so an
  // uploaded CV can't be found by guessing the URL. Strip path separators from
  // the display name we keep for readability.
  const safeName = body.filename.replace(/[/\\]/g, "_").slice(0, 100);
  const key = `uploads/${randomUUID()}-${safeName}`;

  if (isS3Configured()) {
    const result = await presignS3Upload(key, body.content_type, body.size);
    return NextResponse.json(result);
  }

  return NextResponse.json({
    uploadUrl: `/api/upload/${encodeURIComponent(key)}`,
    publicUrl: `/api/files/${encodeURIComponent(key)}`,
  });
}
