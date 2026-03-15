import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

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
  const { error } = await admin.from("updates").delete().eq("id", params.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
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
