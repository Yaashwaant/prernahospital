import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { extractStoragePath } from "@/lib/storage";

import { uuidSchema, updatePatchSchema } from "@/lib/validation";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const paramVal = uuidSchema.safeParse(params.id);
  if (!paramVal.success) {
    return NextResponse.json({ ok: false, error: "Invalid ID parameter format" }, { status: 400 });
  }
  const id = paramVal.data;

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  const { data, error } = await admin.from("updates").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 404 });
  return NextResponse.json({ ok: true, update: data });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const paramVal = uuidSchema.safeParse(params.id);
  if (!paramVal.success) {
    return NextResponse.json({ ok: false, error: "Invalid ID parameter format" }, { status: 400 });
  }
  const id = paramVal.data;

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  // Fetch the row first to get the image URL for storage cleanup
  const { data: row } = await admin.from("updates").select("image").eq("id", id).single();

  // Delete from DB
  const { error } = await admin.from("updates").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  // Clean up image from Supabase Storage
  if (row?.image) {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "updates";
    const storagePath = extractStoragePath(row.image, bucket);
    if (storagePath) {
      await admin.storage.from(bucket).remove([storagePath]);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const paramVal = uuidSchema.safeParse(params.id);
  if (!paramVal.success) {
    return NextResponse.json({ ok: false, error: "Invalid ID parameter format" }, { status: 400 });
  }
  const id = paramVal.data;

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  let update: Record<string, any> = {};
  try {
    const body = await req.json();
    const result = updatePatchSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ ok: false, error: result.error.errors[0]?.message || "Invalid input data" }, { status: 400 });
    }
    const validated = result.data;
    if (validated.title !== undefined) update.title = validated.title;
    if (validated.description !== undefined) update.description = validated.description;
    if (validated.image !== undefined) update.image = validated.image;
    if (validated.date !== undefined) update.date = new Date(validated.date).toISOString();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { error } = await admin.from("updates").update(update).eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

