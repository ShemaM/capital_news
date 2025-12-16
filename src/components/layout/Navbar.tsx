import Link from 'next/link';
import { Search, Menu, User } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Open menu" className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md">
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-red-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold font-serif text-xl">C</span>
            </div>
            <span className="text-xl font-bold font-serif tracking-tight">Capital News</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
<nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
  <Link href="/politics" className="hover:text-red-600 transition-colors">Politics</Link>
  <Link href="/human-rights" className="hover:text-red-600 transition-colors">Human Rights</Link>
  <Link href="/diplomacy" className="hover:text-red-600 transition-colors">Diplomacy</Link>
  <Link href="/exclusive" className="hover:text-red-600 transition-colors">Exclusive</Link>
</nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Search" className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/login" className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/subscribe" className="hidden sm:block ml-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
            Subscribe
          </Link>
        </div>

      </div>
    </header>
  );
}