import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { extractStoragePath } from "@/lib/storage";
import { uuidSchema } from "@/lib/validation";

// DELETE /api/facility-slides/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id: paramId } = await params;
  const paramVal = uuidSchema.safeParse(paramId);
  if (!paramVal.success) {
    return NextResponse.json({ ok: false, error: "Invalid ID parameter format" }, { status: 400 });
  }
  const id = paramVal.data;

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  // Get the slide's image URL before deleting
  const { data: row } = await admin.from("facility_slides").select("src").eq("id", id).single();

  const { error } = await admin.from("facility_slides").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  if (row?.src) {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "updates";
    const storagePath = extractStoragePath(row.src, bucket);
    if (storagePath) {
      await admin.storage.from(bucket).remove([storagePath]);
    }
  }

  return NextResponse.json({ ok: true });
}
