import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold font-serif text-xl">C</span>
              </div>
              <span className="text-xl font-bold font-serif tracking-tight">Capital News</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Reporting on the issues that matter in the Great Lakes Region. Independent, fearless, and accurate.
            </p>
            <div className="flex gap-4 text-slate-400">
              <Twitter className="h-5 w-5 hover:text-white cursor-pointer" />
              <Facebook className="h-5 w-5 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-500">Sections</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/politics" className="hover:text-red-500 transition-colors">Politics</Link></li>
              <li><Link href="/business" className="hover:text-red-500 transition-colors">Business</Link></li>
              <li><Link href="/tech" className="hover:text-red-500 transition-colors">Technology</Link></li>
              <li><Link href="/lifestyle" className="hover:text-red-500 transition-colors">Lifestyle</Link></li>
              <li><Link href="/opinion" className="hover:text-red-500 transition-colors">Opinion</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-500">About Us</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">The Team</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-500">Subscribe</h4>
            <p className="text-slate-400 text-xs mb-4">Get the latest updates directly to your inbox.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800 border border-slate-700 text-white text-sm rounded px-4 py-2 focus:outline-none focus:border-red-600"
              />
              <button className="bg-red-600 text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Capital News. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}