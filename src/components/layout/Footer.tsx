import Link from 'next/link';
import { Mail, Shield, Globe, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-300 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        
        {/* Mission Statement */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 italic leading-relaxed">
            Capital News is dedicated to independent, in-depth reporting on conflict, politics, 
            and humanitarian issues across the Great Lakes Region.
          </p>
        </div>

        {/* Simplified Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-gray-200 pb-12">
          
          {/* Column 1: Core Coverage */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">
              <Globe className="h-4 w-4 text-red-600" />
              Coverage
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/politics" className="text-gray-600 hover:text-red-600 transition-colors">Regional Politics</Link></li>
              <li><Link href="/conflict" className="text-gray-600 hover:text-red-600 transition-colors">Conflict Monitor</Link></li>
              <li><Link href="/humanitarian" className="text-gray-600 hover:text-red-600 transition-colors">Humanitarian</Link></li>
              <li><Link href="/diplomacy" className="text-gray-600 hover:text-red-600 transition-colors">Diplomacy</Link></li>
            </ul>
          </div>

          {/* Column 2: Region Focus */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">
              <MapPin className="h-4 w-4 text-red-600" />
              The Region
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/drc" className="text-gray-600 hover:text-red-600 transition-colors">DR Congo</Link></li>
              <li><Link href="/rwanda" className="text-gray-600 hover:text-red-600 transition-colors">Rwanda</Link></li>
              <li><Link href="/burundi" className="text-gray-600 hover:text-red-600 transition-colors">Burundi</Link></li>
              <li><Link href="/uganda" className="text-gray-600 hover:text-red-600 transition-colors">Uganda</Link></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">About Capital News</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/mission" className="text-gray-600 hover:text-red-600 transition-colors">Our Mission</Link></li>
              <li><Link href="/team" className="text-gray-600 hover:text-red-600 transition-colors">Editorial Team</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">Contact Us</Link></li>
             </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">
              <Mail className="h-4 w-4 text-red-600" />
              Stay Informed
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Weekly briefings on security and politics in the region.
            </p>
            <Link href="/subscribe" className="inline-block px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded hover:bg-red-700 transition-colors">
              Subscribe Free
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            <p>&copy; {new Date().getFullYear()} Capital News. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-red-600 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/terms" className="hover:text-red-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}