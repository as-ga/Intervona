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
  const root = process.cwd();
  const target = path.resolve(root, decoded);
  if (!target.startsWith(path.resolve(root, "uploads") + path.sep)) {
    return NextResponse.json({ error: "Invalid file key" }, { status: 400 });
  }
  try {
    const content = await readFile(target);
    return new NextResponse(content);
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
