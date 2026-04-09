import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Supabase not configured. Please add SUPABASE env vars." }, { status: 500 });
  }

  // Optional folder param: ?folder=hero | facilities | updates (default)
  const url = new URL(req.url);
  const folder = url.searchParams.get("folder") || "updates";

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "updates";
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const safeName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error: upErr } = await admin.storage.from(bucket).upload(path, bytes, {
    contentType: file.type || "application/octet-stream",
    upsert: true,
  });

  if (upErr) {
    return NextResponse.json({ error: "Upload failed: " + upErr.message }, { status: 500 });
  }

  const { data } = admin.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}
