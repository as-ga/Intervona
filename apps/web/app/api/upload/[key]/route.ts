import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function PUT(request: Request, context: { params: Promise<{ key: string }> }) {
  const { key } = await context.params;
  const decoded = decodeURIComponent(key);
  if (!decoded.startsWith("uploads/") || decoded.includes("..")) {
    return NextResponse.json({ error: "Invalid upload key" }, { status: 400 });
  }
  const content = Buffer.from(await request.arrayBuffer());
  const root = process.cwd();
  const target = path.resolve(root, decoded);
  if (!target.startsWith(path.resolve(root, "uploads") + path.sep)) {
    return NextResponse.json({ error: "Invalid upload key" }, { status: 400 });
  }
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
  return new NextResponse(null, { status: 204 });
}
