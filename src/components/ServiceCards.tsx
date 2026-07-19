"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, memo, useState } from "react";
import { fadeInUp } from "@/lib/animations";
import { useLanguage } from "@/lib/i18n";

interface ServiceItem {
  image: string;
  titleKey: string;
  descriptionKey: string;
  slug: string;
}

const SERVICES: ServiceItem[] = [
  {
    image: "/neuro-psychiatry.png",
    titleKey: "services.neuropsychiatry.title",
    descriptionKey: "services.neuropsychiatry.description",
    slug: "neuropsychiatry",
  },
  {
    image: "/de-addiction-services.png",
    titleKey: "services.deaddiction.title",
    descriptionKey: "services.deaddiction.description",
    slug: "de-addiction-medicine",
  },
  {
    image: "/children-adolescent-psychiatry.png",
    titleKey: "services.childPsychiatry.title",
    descriptionKey: "services.childPsychiatry.description",
    slug: "child-and-adolescent-psychiatry",
  },
  {
    image: "/sexual-medicine.png",
    titleKey: "services.sexualMedicine.title",
    descriptionKey: "services.sexualMedicine.description",
    slug: "sexual-medicine",
  },
  {
    image: "/therapy-sessions.png",
    titleKey: "services.psychologicalTherapy.title",
    descriptionKey: "services.psychologicalTherapy.description",
    slug: "psychological-therapy",
  },
  {
    image: "/psychological-testing-assessment.png",
    titleKey: "services.psychologicalTesting.title",
    descriptionKey: "services.psychologicalTesting.description",
    slug: "psychological-testing",
  },
  {
    image: "/pathology.png",
    titleKey: "services.pathology.title",
    descriptionKey: "services.pathology.description",
    slug: "pathology",
  },
  {
    image: "/geriatric-mental-health.png",
    titleKey: "services.geriatric.title",
    descriptionKey: "services.geriatric.description",
    slug: "geriatric-mental-health",
  }
];

/**
 * Individual service card component
 * Memoized to prevent unnecessary re-renders
 */
interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = memo<ServiceCardProps>(({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const title = t(service.titleKey);
  const description = t(service.descriptionKey);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group mx-auto w-full rounded-[28px] border-2 border-[#1F4FD8]/45 bg-[#FFFFFF] px-5 py-4 shadow-refined transition-all hover:border-[#1F4FD8] hover:shadow-deep"
      role="article"
      aria-label={`${title} service`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex min-h-[92px] w-full items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0.9 }}
            whileInView={{ scale: 1, opacity: 1 }}
            animate={isHovered ? { rotate: 3 } : { rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative h-14 w-14 overflow-hidden rounded-2xl ring-2 ring-[#1F4FD8]/30"
            role="img"
            aria-hidden="false"
          >
            <Image
              src={service.image}
              alt={`${title} - Prerna Hospital, Chhatrapati Sambhajinagar`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain"
              priority={index === 0}
            />
          </motion.div>
          <h3 className="text-[15px] md:text-[16px] font-semibold leading-snug text-[#1F4FD8]">
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`svc-desc-${index}`}
          aria-label={open ? `Collapse ${title} details` : `Expand ${title} details`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1F4FD8]/40 text-[#1F4FD8] hover:bg-[#F4F7FB] transition"
        >
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        </button>
      </div>

      {/* Description is always in DOM so aria-describedby is never broken */}
      <div
        id={`svc-desc-${index}`}
        role="region"
        aria-live="polite"
        className={open ? undefined : "sr-only"}
      >
        <AnimatePresence initial={false}>
          {open && description && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 text-xs text-gray-700"
            >
              <p className="mb-2">{description}</p>
              <Link href={`/services/${service.slug}`} className="inline-flex items-center text-[#1F4FD8] font-semibold hover:underline">
                Learn more<span className="sr-only"> about {title}</span> <span className="ml-1">&rarr;</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = "ServiceCard";

/**
 * Main ServiceCards section component
 */
export default function ServiceCards() {
  const memoizedServices = useMemo(() => SERVICES, []);
  const left = memoizedServices.slice(0, 4);
  const right = memoizedServices.slice(4);
  const { t } = useLanguage();

  return (
    <section className="relative w-full pt-2 pb-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-[#1A1A1A] md:text-2xl">{t("services.heading")}</h2>
        </div>
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-stretch gap-4">
            {left.map((service, index) => (
              <ServiceCard key={`${service.titleKey}-${index}`} service={service} index={index} />
            ))}
          </div>
          <div className="flex flex-col items-stretch gap-4">
            {right.map((service, i) => (
              <ServiceCard key={`${service.titleKey}-${i + 4}`} service={service} index={i + 4} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
