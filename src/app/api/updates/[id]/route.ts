import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { updates } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const db = getDb();
    await db.delete(updates).where(eq(updates.id, params.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const body = await req.json();
    const db = getDb();
    await db.update(updates).set(body).where(eq(updates.id, params.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
