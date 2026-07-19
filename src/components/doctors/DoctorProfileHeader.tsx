import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone } from "lucide-react";

export function DoctorProfileHeader({ doctor }: { doctor: any }) {
  return (
    <div className="bg-gradient-to-b from-[#003D52] via-[#005A73] to-[#007C88] pb-10 pt-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/#team"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>
          <p className="hidden text-xs font-medium uppercase tracking-[0.18em] text-white/80 md:block">
            Inspiring Minds
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-stretch">
          <div className="relative rounded-[32px] bg-white/5 p-[3px] shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
            <div className="grid h-full grid-cols-1 overflow-hidden rounded-[28px] bg-white md:grid-cols-[1.1fr_1.4fr]">
              <div className="relative min-h-[260px] bg-[#E9F4FF]">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <div className="flex flex-col gap-3 px-5 py-6 md:px-7 md:py-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00C4CF]">
                  {doctor.slug === "anuradha-patil"
                    ? "Consultant Pathologist"
                    : "Consultant Psychiatrist"}
                </p>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#003D52]">
                  {doctor.name.toUpperCase()}
                </h1>
                <p className="text-sm font-medium text-[#25324B]">
                  {doctor.role}
                </p>

                <div className="mt-2 space-y-1 text-xs md:text-sm">
                  <p className="font-semibold text-[#003D52]">
                    Qualification:
                  </p>
                  <p className="text-[#25324B]">{doctor.qualifications}</p>
                </div>

                <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#003D52]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F7F9] px-3 py-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {doctor.location}
                  </span>
                  <a
                    href="tel:07887888865"
                    className="inline-flex items-center gap-1 rounded-full bg-[#FFB703] px-3 py-1 text-[11px] font-semibold text-[#003D52] shadow-sm hover:bg-[#FFCF5A]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call to book appointment
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl bg-white/10 p-4 text-sm text-white md:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E0F7F8]">
              Key Specialities
            </p>
            <ul className="space-y-2 text-sm">
              {doctor.Specialities.map((item: string) => (
                <li
                  key={item}
                  className="rounded-xl bg-white/10 px-3 py-2 text-sm backdrop-blur"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-[#CFEDEF]">
              Prerna Hospital offers comprehensive psychiatric, de-addiction
              and child guidance services with a multidisciplinary team of
              specialists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
