import Link from "next/link";

export default function HospitalFooter() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#008489]">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M12 2v20M2 12h20M7 7l10 10M7 17l10-10" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#003D52]">PRERNA <span className="text-[#008489]">HOSPITAL</span></span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Dedicated to providing world-class healthcare with compassion and innovation. Your wellness is our priority.
            </p>
          </div>
          
          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#003D52]">Quick Links</h5>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-[#008489]">Specialities</Link></li>
              <li><Link href="#" className="hover:text-[#008489]">Our Doctors</Link></li>
              <li><Link href="#" className="hover:text-[#008489]">Patient Portal</Link></li>
              <li><Link href="#" className="hover:text-[#008489]">Health Packages</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#003D52]">Support</h5>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-[#008489]">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-[#008489]">Emergency Services</Link></li>
              <li><Link href="#" className="hover:text-[#008489]">News & Updates</Link></li>
              <li><Link href="#" className="hover:text-[#008489]">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#003D52]">Contact Info</h5>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-[#003D52]">Phone:</span> 88888 7777
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-[#003D52]">Email:</span> info@prernahospital.com
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[#003D52]">Address:</span> 123 Health Avenue, Medical District
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-100 pt-8 text-center">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            © 2026 Prerna Hospital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
