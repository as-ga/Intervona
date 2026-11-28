import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(
  _request: Request,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;
  const decoded = decodeURIComponent(key);
  if (!decoded.startsWith("uploads/") || decoded.includes("..")) {
    return NextResponse.json({ error: "Invalid file key" }, { status: 400 });
  }
  const uploadRoot = path.join(process.cwd(), "uploads");
  const target = path.resolve(uploadRoot, decoded.slice("uploads/".length));
  if (!target.startsWith(`${uploadRoot}${path.sep}`)) {
    return NextResponse.json({ error: "Invalid file key" }, { status: 400 });
  }
  try {
    const content = await readFile(target);
    return new NextResponse(content);
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
