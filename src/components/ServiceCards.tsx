"use client";

import { motion } from "framer-motion";
import { Brain, Baby, Ribbon, Sparkles, PlusCircle } from "lucide-react";

const services = [
  {
    title: "Neurology & Spine Care",
    icon: Brain,
  },
  {
    title: "Pediatrics & Child Health",
    icon: Baby,
  },
  {
    title: "Oncology & Cancer Care",
    icon: Ribbon,
  },
  {
    title: "Dermatology & Cosmetology",
    icon: Sparkles,
  },
  {
    title: "Emergency & Trauma",
    icon: PlusCircle,
  },
];

export default function ServiceCards() {
  return (
    <section className="w-full bg-white pb-24 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group flex flex-col items-center justify-center rounded-[32px] border border-[#008489]/10 bg-gradient-to-b from-[#F8FDFF] to-white p-8 text-center transition-all hover:border-[#008489]/30 hover:shadow-[0_20px_50px_rgba(0,132,137,0.1)]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all group-hover:bg-[#008489] group-hover:shadow-[0_15px_30px_rgba(0,132,137,0.3)]">
                <service.icon className="h-8 w-8 text-[#008489] transition-colors group-hover:text-white" />
              </div>
              <h4 className="text-[15px] font-bold leading-tight text-[#003D52]">
                {service.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
