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

import { heroSlidePostSchema, reorderSchema } from "@/lib/validation";

// POST /api/hero-slides — add a new slide
export async function POST(req: Request) {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  let src: string;
  let alt: string;

  try {
    const body = await req.json();
    const result = heroSlidePostSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ ok: false, error: result.error.errors[0]?.message || "Invalid input data" }, { status: 400 });
    }
    src = result.data.src;
    alt = result.data.alt || "Hospital photo";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Determine next order_index
  const { data: existing } = await admin.from("hero_slides").select("order_index").order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing && existing.length > 0 ? (existing[0].order_index ?? 0) + 1 : 0;

  const { data, error } = await admin
    .from("hero_slides")
    .insert({ src, alt, order_index: nextOrder })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slide: data });
}

// PATCH /api/hero-slides — reorder: body = { ids: string[] }
export async function PATCH(req: Request) {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });

  let ids: string[];
  try {
    const body = await req.json();
    const result = reorderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ ok: false, error: result.error.errors[0]?.message || "Invalid ids array" }, { status: 400 });
    }
    ids = result.data.ids;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Update each slide's order_index to its position in the array
  const updates = ids.map((id, index) =>
    admin.from("hero_slides").update({ order_index: index }).eq("id", id)
  );

  await Promise.all(updates);
  return NextResponse.json({ ok: true });
}

