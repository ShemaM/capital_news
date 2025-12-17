import Link from 'next/link';
import { Mail, Shield, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-300 pt-12 pb-8 mt-auto font-sans">
      <div className="container mx-auto px-4">
        
        {/* Mission Statement */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 italic leading-relaxed font-serif">
            Capital News is dedicated to independent, in-depth reporting on conflict, politics, 
            and humanitarian issues across the Great Lakes Region.
          </p>
        </div>

        {/* Streamlined Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-gray-200 pb-12">
          
          {/* Column 1: Core Coverage */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-[11px] text-gray-900 tracking-[0.2em] mb-4">
              <Globe className="h-4 w-4 text-red-600" />
              Coverage
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <li><Link href="/politics" className="text-gray-600 hover:text-red-600 transition-colors">Politics</Link></li>
              <li><Link href="/human-rights" className="text-gray-600 hover:text-red-600 transition-colors">Human Rights</Link></li>
              <li><Link href="/diplomacy" className="text-gray-600 hover:text-red-600 transition-colors">Diplomacy</Link></li>
              <li><Link href="/business" className="text-gray-600 hover:text-red-600 transition-colors">Business</Link></li>
              <li><Link href="/tech" className="text-gray-600 hover:text-red-600 transition-colors">Technology</Link></li>
              <li><Link href="/exclusive" className="text-red-700 font-bold hover:text-red-600 transition-colors">Exclusives</Link></li>
            </ul>
          </div>

          {/* Column 2: About Capital News */}
          <div>
            <h4 className="font-bold uppercase text-[11px] text-gray-900 tracking-[0.2em] mb-4">Inside the Newsroom</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/mission" className="text-gray-600 hover:text-red-600 transition-colors">Our Mission</Link></li>
              <li><Link href="/team" className="text-gray-600 hover:text-red-600 transition-colors">Editorial Team</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-[11px] text-gray-900 tracking-[0.2em] mb-4">
              <Mail className="h-4 w-4 text-red-600" />
              Stay Informed
            </h4>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Weekly briefings on security and politics in the region.
            </p>
            <Link href="/subscribe" className="inline-block px-5 py-2.5 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded hover:bg-red-700 transition-all shadow-md">
              Subscribe Free
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500 font-medium">
          <div>
            <p>&copy; {new Date().getFullYear()} Capital News. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-red-600 flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/terms" className="hover:text-red-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}