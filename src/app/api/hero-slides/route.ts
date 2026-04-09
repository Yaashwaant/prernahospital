import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// GET /api/hero-slides — list all slides ordered
export async function GET() {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ slides: [] });

  const { data, error } = await admin
    .from("hero_slides")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) return NextResponse.json({ slides: [] });
  return NextResponse.json({ slides: data || [] });
}

// POST /api/hero-slides — add a new slide
export async function POST(req: Request) {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  const body = await req.json();
  const { src, alt } = body;
  if (!src) return NextResponse.json({ ok: false, error: "src is required" }, { status: 400 });

  // Determine next order_index
  const { data: existing } = await admin.from("hero_slides").select("order_index").order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing && existing.length > 0 ? (existing[0].order_index ?? 0) + 1 : 0;

  const { data, error } = await admin
    .from("hero_slides")
    .insert({ src, alt: alt || "Hospital photo", order_index: nextOrder })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slide: data });
}

// PATCH /api/hero-slides — reorder: body = { ids: string[] }
export async function PATCH(req: Request) {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  const { ids } = await req.json() as { ids: string[] };
  if (!Array.isArray(ids)) return NextResponse.json({ ok: false, error: "ids array required" }, { status: 400 });

  // Update each slide's order_index to its position in the array
  const updates = ids.map((id, index) =>
    admin.from("hero_slides").update({ order_index: index }).eq("id", id)
  );

  await Promise.all(updates);
  return NextResponse.json({ ok: true });
}
