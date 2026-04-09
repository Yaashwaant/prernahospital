import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { extractStoragePath } from "@/lib/storage";

// DELETE /api/hero-slides/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  // Get the slide's image URL before deleting
  const { data: row } = await admin.from("hero_slides").select("src").eq("id", params.id).single();

  // Delete from DB
  const { error } = await admin.from("hero_slides").delete().eq("id", params.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  // Clean up image from Supabase Storage
  if (row?.src) {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "updates";
    const storagePath = extractStoragePath(row.src, bucket);
    if (storagePath) {
      await admin.storage.from(bucket).remove([storagePath]);
    }
  }

  return NextResponse.json({ ok: true });
}
