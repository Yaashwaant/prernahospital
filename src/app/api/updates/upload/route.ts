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
  const ALLOWED_FOLDERS = ["hero", "facilities", "updates"];
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: "Invalid folder parameter" }, { status: 400 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file") as File | null;
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // 1. File size limit: 5MB
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File size exceeds the 5MB limit" }, { status: 400 });
  }

  // 2. MIME type whitelist
  const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!ALLOWED_MIMES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type. Only standard image files are allowed." }, { status: 400 });
  }

  // 3. Extension to MIME verification
  const MIME_EXT_MAP: Record<string, string[]> = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
    "image/gif": [".gif"],
    "image/svg+xml": [".svg"],
  };
  const extIdx = file.name.lastIndexOf(".");
  if (extIdx === -1) {
    return NextResponse.json({ error: "File must have an extension" }, { status: 400 });
  }
  const ext = file.name.substring(extIdx).toLowerCase();
  const expectedExts = MIME_EXT_MAP[file.type];
  if (!expectedExts || !expectedExts.includes(ext)) {
    return NextResponse.json({ error: "File extension does not match the file type" }, { status: 400 });
  }

  // 4. Safe filename construction
  const baseName = file.name.substring(0, extIdx);
  const safeBase = baseName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "");
  const finalBase = safeBase || "uploaded-image";
  const safeName = `${finalBase}${ext}`;
  const path = `${folder}/${Date.now()}-${safeName}`;

  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "updates";
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

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

