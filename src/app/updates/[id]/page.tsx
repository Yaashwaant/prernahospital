import Image from "next/image";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";

async function getUpdate(id: string) {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data } = await admin.from("updates").select("*").eq("id", id).single();
  return data ?? null;
}

export default async function UpdateDetailPage({ params }: { params: { id: string } }) {
  const update = await getUpdate(params.id);
  if (!update) {
    return (
      <main className="min-h-screen bg-[#F3F7FA] flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Event not found</h1>
          <p className="text-sm text-gray-600">This event may have been removed or is temporarily unavailable.</p>
          <Link href="/" className="text-[#1F4FD8] hover:underline">Go back home</Link>
        </div>
      </main>
    );
  }

  const dateStr = update.date ? new Date(update.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";

  return (
    <main className="min-h-screen bg-[#F3F7FA]">
      <div className="bg-gradient-to-b from-[#003D52] via-[#005A73] to-[#007C88] pb-10 pt-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              Back to Home
            </Link>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
              Updates
            </span>
          </div>

          <div className="rounded-[32px] bg-white/5 p-[3px] shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
            <div className="rounded-[28px] bg-white overflow-hidden">
              <div className="relative h-[260px] md:h-[380px] bg-[#E9F4FF]">
                {update.image ? (
                  <Image src={update.image} alt={update.title || "Event"} fill className="object-cover" />
                ) : null}
                {dateStr ? (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm ring-1 ring-gray-200">
                    <span className="text-xs font-semibold text-[#003D52]">{dateStr}</span>
                  </div>
                ) : null}
              </div>
              <div className="p-6 md:p-10">
                <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{update.title || "Hospital Update"}</h1>
                <p className="mt-3 text-sm text-gray-600">{update.description || "No description provided."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
