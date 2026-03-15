"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown
} from "lucide-react";
import Image from "next/image";
import { useMemo, memo, useState } from "react";
import { fadeInUp } from "@/lib/animations";

interface ServiceItem {
  title: string;
  image: string;
  description?: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Neuropsychiatry",
    image: "/Neuro%20psychaitry.png",
    description: `At our hospital, we believe that true healing begins with a healthy mind. As a premier destination for psychiatric care in India, we bridge the gap between clinical excellence and compassionate support. Our dedicated team of specialists offers a sanctuary for recovery, providing evidence-based therapies and personalized care plans. Whether navigating complex disorders or seeking emotional resilience, we are here to guide you toward a brighter, more balanced future.`
  },
  {
    title: "De-Addiction Services",
    image: "/De-addiction%20services%20.png",
    description: `Addiction is a complex challenge that affects both the body and the mind. At our specialized De-Addiction unit, we offer a multidisciplinary approach to recovery, focusing on detoxification, rehabilitation, and long-term relapse prevention. Our expert team provides medically supervised withdrawal management alongside intensive counselling to address the root causes of substance use. We don’t just treat the addiction; we treat the person, ensuring a holistic transition back to a healthy, productive life.`
  },
  {
    title: "Child & Adolescent Psychiatry",
    image: "/Childern%20and%20adoldece%20psychaitry.png",
    description: `Childhood and adolescence are critical stages of development that shape an individual's future. At our Child and Adolescent Psychiatry Department, we provide a nurturing and supportive environment where young minds can find the specialized care they need to navigate emotional, behavioral, and developmental challenges.`
  },
  {
    title: "Sexual Medicine",
    image: "/sexual%20medicine.png",
    description: `Sexual medicine provides a clinical approach to addressing physical, emotional, and psychological issues related to sexual health and function. It aims to improve quality of life by treating dysfunctions and fostering healthy interpersonal relationships through medical and therapeutic means.`
  },
  {
    title: "Psychological Therapy",
    image: "/therepy%20sesstions.png",
    description: `Also known as psychotherapy or counselling, this specialty involves evidence-based talk therapy to help individuals navigate emotional distress, trauma, and mental health disorders. It focuses on developing coping mechanisms, changing thought patterns, and improving overall emotional resilience.`
  },
  {
    title: "Psychological Testing & Assessment",
    image: "/Psychological%20Testing%20%26%20Assessment.png",
    description: `Psychological testing is a specialized diagnostic process used to gain a deep understanding of a person’s personality, intelligence, and cognitive functioning. At Prerna Hospital, we conduct standardized assessments—including IQ tests, personality profiles, and diagnostic screenings for ADHD, Autism, and Learning Disabilities. These tests act as a "blueprint" for your mental health, allowing our psychiatrists and therapists to create a highly accurate and personalized treatment plan.`
  },
  {
    title: "Pathology & Lab Services",
    image: "/Pathology.png",
    description: `Our Department of Pathology offers a comprehensive range of diagnostic services that empower our clinical teams to provide superior patient care. Utilizing automated platforms and advanced molecular diagnostics, we provide deep insights into disease patterns and progression. Whether it’s Histopathology, Cytology, or Clinical Biochemistry, our lab operates with a "zero-error" philosophy, ensuring that your healthcare journey is guided by facts, data, and medical excellence.`
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
      aria-label={`${service.title} service`}
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
            <Image src={service.image} alt={service.title} fill className="object-contain" />
          </motion.div>
          <h4 className="text-[15px] md:text-[16px] font-semibold leading-snug text-[#1F4FD8]">
            {service.title}
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`svc-desc-${index}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1F4FD8]/40 text-[#1F4FD8] hover:bg-[#F4F7FB] transition"
        >
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && service.description && (
          <motion.div
            id={`svc-desc-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 text-xs text-gray-600"
          >
            {service.description}
          </motion.div>
        )}
      </AnimatePresence>
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
  const right = memoizedServices.slice(4, 7);

  return (
    <section className="relative w-full -mt-12 pb-24 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-stretch gap-4">
            {left.map((service, index) => (
              <ServiceCard key={`${service.title}-${index}`} service={service} index={index} />
            ))}
          </div>
          <div className="flex flex-col items-stretch gap-4">
            {right.map((service, i) => (
              <ServiceCard key={`${service.title}-${i + 4}`} service={service} index={i + 4} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
