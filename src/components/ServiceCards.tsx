"use client";

import { motion } from "framer-motion";
import { Brain, Baby, Ribbon, Sparkles, PlusCircle, LucideIcon } from "lucide-react";
import { useMemo, memo, useState } from "react";
import { fadeInUp, springBounce } from "@/lib/animations";

/**
 * Service card configuration
 * Extracted to const for maintainability and type safety
 */
interface ServiceItem {
  title: string;
  icon: LucideIcon;
  description?: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Neurology & Spine Care",
    icon: Brain,
    description: "Expert neurological care"
  },
  {
    title: "Pediatrics & Child Health",
    icon: Baby,
    description: "Specialized child healthcare"
  },
  {
    title: "Oncology & Cancer Care",
    icon: Ribbon,
    description: "Advanced cancer treatment"
  },
  {
    title: "Dermatology & Cosmetology",
    icon: Sparkles,
    description: "Skin and cosmetic services"
  },
  {
    title: "Emergency & Trauma",
    icon: PlusCircle,
    description: "24/7 emergency services"
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
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group mx-auto flex w-full max-w-[170px] flex-col items-center justify-center rounded-[28px] border-2 border-[#1F4FD8]/45 bg-[#FFFFFF] px-4 py-7 text-center shadow-refined transition-all cursor-pointer hover:border-[#1F4FD8] hover:shadow-deep md:min-h-[210px] min-h-[190px]"
      role="article"
      aria-label={`${service.title} service`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0.9 }}
        whileInView={{ scale: 1, opacity: 1 }}
        animate={isHovered ? { rotate: 6 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="mb-4 flex h-12 w-12 items-center justify-center text-[#1F4FD8]"
        role="img"
        aria-hidden="false"
      >
        <Icon className="h-10 w-10" />
      </motion.div>

      <h4 className="text-[14px] md:text-[15px] font-semibold leading-snug text-[#1F4FD8]">
        {service.title}
      </h4>
    </motion.div>
  );
});

ServiceCard.displayName = "ServiceCard";

/**
 * Main ServiceCards section component
 */
export default function ServiceCards() {
  const memoizedServices = useMemo(() => SERVICES, []);

  return (
    <section className="relative w-full -mt-12 pb-24 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          className="mx-auto grid max-w-[900px] grid-cols-2 justify-items-center gap-4 md:grid-cols-5 md:gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {memoizedServices.map((service, index) => (
            <ServiceCard
              key={`${service.title}-${index}`}
              service={service}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
