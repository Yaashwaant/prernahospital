import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// GET /api/facility-slides
export async function GET() {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ slides: [] });

  const { data, error } = await admin
    .from("facility_slides")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) return NextResponse.json({ slides: [] });
  return NextResponse.json({ slides: data || [] });
}

// POST /api/facility-slides
export async function POST(req: Request) {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  const body = await req.json();
  const { src, label } = body;
  if (!src) return NextResponse.json({ ok: false, error: "src is required" }, { status: 400 });

  const { data: existing } = await admin.from("facility_slides").select("order_index").order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing && existing.length > 0 ? (existing[0].order_index ?? 0) + 1 : 0;

  const { data, error } = await admin
    .from("facility_slides")
    .insert({ src, label: label || "Hospital Facility", order_index: nextOrder })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slide: data });
}

// PATCH /api/facility-slides — reorder: body = { ids: string[] }
export async function PATCH(req: Request) {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  const { ids } = await req.json() as { ids: string[] };
  if (!Array.isArray(ids)) return NextResponse.json({ ok: false, error: "ids array required" }, { status: 400 });

  const updates = ids.map((id, index) =>
    admin.from("facility_slides").update({ order_index: index }).eq("id", id)
  );

  await Promise.all(updates);
  return NextResponse.json({ ok: true });
}
