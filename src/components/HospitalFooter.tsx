"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HospitalFooter() {
  return (
    <footer className="w-full border-t border-gray-100 bg-gradient-to-b from-[#F4F7FB] to-[#E8F2F7] py-16" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}>
              <div className="relative h-10 w-10 md:w-12">
                <Image
                  src="/logo.svg"
                  alt="Prerna Hospital logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold leading-none tracking-tight text-[#1F4FD8]">
                  Prerna Hospital
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                  Inspiring Minds
                </span>
              </div>
            </motion.div>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Dedicated to providing world-class healthcare with compassion and innovation. Your wellness is our priority.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#1F4FD8]">Quick Links</h5>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}><Link href="#" className="hover:text-[#5D2CB3] transition-colors">Specialities</Link></motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}><Link href="#" className="hover:text-[#5D2CB3] transition-colors">Our Doctors</Link></motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}><Link href="#" className="hover:text-[#5D2CB3] transition-colors">Patient Portal</Link></motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}><Link href="#" className="hover:text-[#5D2CB3] transition-colors">Health Packages</Link></motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#1F4FD8]">Support</h5>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}><Link href="#" className="hover:text-[#5D2CB3] transition-colors">Contact Us</Link></motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}><Link href="#" className="hover:text-[#5D2CB3] transition-colors">Emergency Services</Link></motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}><Link href="#" className="hover:text-[#5D2CB3] transition-colors">News & Updates</Link></motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}><Link href="#" className="hover:text-[#5D2CB3] transition-colors">Privacy Policy</Link></motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#1F4FD8]">Contact Info</h5>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <span className="font-semibold text-[#1F4FD8]">Phone:</span> 88888 7777
              </motion.li>
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <span className="font-semibold text-[#1F4FD8]">Email:</span> info@prernahospital.com
              </motion.li>
              <motion.li 
                className="flex items-start gap-2"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <span className="font-semibold text-[#1F4FD8]">Address:</span> 123 Health Avenue, Medical District
              </motion.li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-refined">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.5!2d72.88!3d19.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba29ba5450bd9%3A0x8ebe71ef487e11c!2sPRERNA%20HOSPITAL%20Inspiring%20Minds....!5e0!3m2!1sen!2sin!4v1770401595854!5m2!1sen!2sin&zoom=17"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Prerna Hospital Location Map"
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-16 border-t border-gray-200 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            © 2026 Prerna Hospital. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}