import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

import { updatePostSchema } from "@/lib/validation";

export async function GET() {
  const admin = createAdminClient();
  if (!admin) {
    const demo = [
      {
        id: "demo-1",
        title: "Welcome to Prerna Hospital Updates",
        description: "",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMUY0RkQ4Ii8+PC9zdmc+",
        date: new Date().toISOString(),
      },
    ];
    return NextResponse.json({ updates: demo });
  }
  const { data, error } = await admin
    .from("updates")
    .select("*")
    .order("date", { ascending: false })
    .limit(12);
  if (error) {
    const demo = [
      {
        id: "demo-1",
        title: "Welcome to Prerna Hospital Updates",
        description: "",
        image:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMUY0RkQ4Ii8+PC9zdmc+",
        date: new Date().toISOString(),
      },
    ];
    return NextResponse.json({ updates: demo });
  }
  return NextResponse.json({ updates: data || [] });
}

export async function POST(req: Request) {
  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  }
  try {
    const body = await req.json();
    const result = updatePostSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ ok: false, error: { message: result.error.errors[0]?.message || "Invalid input data" } }, { status: 400 });
    }
    const validated = result.data;
    const id = validated.id || crypto.randomUUID();
    const row = {
      id,
      title: validated.title,
      description: validated.description,
      image: validated.image,
      date: new Date(validated.date).toISOString(),
    };
    const { error } = await admin.from("updates").upsert(row, { onConflict: "id" });
    if (error) throw error;
    return NextResponse.json({ ok: true, id });
  } catch (e: any) {

    const detail = {
      message: e?.message ?? "unknown error",
      code: e?.code ?? null,
      name: e?.name ?? null,
      cause: e?.cause?.message ?? null,
    };
    return NextResponse.json({ ok: false, error: detail }, { status: 500 });
  }
}
