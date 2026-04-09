import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { extractStoragePath } from "@/lib/storage";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  const { data, error } = await admin.from("updates").select("*").eq("id", params.id).single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 404 });
  return NextResponse.json({ ok: true, update: data });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  // Fetch the row first to get the image URL for storage cleanup
  const { data: row } = await admin.from("updates").select("image").eq("id", params.id).single();

  // Delete from DB
  const { error } = await admin.from("updates").delete().eq("id", params.id);
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
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  const body = await req.json();
  const update: Record<string, any> = {};
  if (typeof body.title === "string") update.title = body.title;
  if (typeof body.description === "string") update.description = body.description;
  if (typeof body.image === "string") update.image = body.image;
  if (body.date) update.date = new Date(body.date).toISOString();
  const { error } = await admin.from("updates").update(update).eq("id", params.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
