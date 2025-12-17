'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, User, X } from 'lucide-react';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false); // Close the search bar
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              aria-label="Open Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold font-serif text-xl">C</span>
              </div>
              <span className="text-xl font-bold font-serif tracking-tight hidden sm:block">Capital News</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/politics" className="hover:text-red-600 transition-colors">Politics</Link>
            <Link href="/business" className="hover:text-red-600 transition-colors">Business</Link>
            <Link href="/tech" className="hover:text-red-600 transition-colors">Tech</Link>
            <Link href="/human-rights" className="hover:text-red-600 transition-colors">Human Rights</Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            
            {/* Search Toggle */}
            <div className="relative">
                {isSearchOpen ? (
                   <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-slate-300 rounded-full pl-4 pr-2 py-1 shadow-lg w-64 transition-all">
                      <input 
                        autoFocus
                        type="text" 
                        placeholder="Search news..." 
                        className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => !searchQuery && setIsSearchOpen(false)} // Close if empty and clicked away
                      />
                      <button type="button" aria-label="Close search" onClick={() => setIsSearchOpen(false)} className="p-1 text-slate-400 hover:text-red-600">
                        <X className="h-4 w-4" />
                      </button>
                   </form>
                ) : (
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}
            </div>

            <Link href="/login" className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/subscribe" className="hidden sm:block ml-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
              Subscribe
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-4 md:hidden animate-in slide-in-from-top-10 duration-200">
           <nav className="flex flex-col gap-6 text-lg font-bold text-slate-800">
              <Link href="/politics" onClick={() => setIsMenuOpen(false)}>Politics</Link>
              <Link href="/business" onClick={() => setIsMenuOpen(false)}>Business</Link>
              <Link href="/tech" onClick={() => setIsMenuOpen(false)}>Technology</Link>
              <Link href="/human-rights" onClick={() => setIsMenuOpen(false)}>Human Rights</Link>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-red-600">Sign In</Link>
           </nav>
        </div>
      )}
    </>
  );
}