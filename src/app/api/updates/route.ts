import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { updates } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const db = getDb();
    const rows = await db.select().from(updates).orderBy(desc(updates.date)).limit(12);
    return NextResponse.json({ updates: rows });
  } catch {
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
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDb();
    const id = body.id || crypto.randomUUID();
    const row = {
      id,
      title: body.title || "",
      description: body.description || "",
      image: body.image || "",
      date: new Date(body.date || new Date().toISOString()),
    };
    // Upsert by id
    await db
      .insert(updates)
      .values(row)
      .onConflictDoUpdate({ target: updates.id, set: row });
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
