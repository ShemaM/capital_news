'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// FIX: Essential import for handling auth
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { LayoutDashboard, PenTool, FileText, Settings, LogOut, Loader2 } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // 1. Initialize Supabase Client
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  ));
  const [loading, setLoading] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Create Post/Articles', href: '/admin/create', icon: <PenTool size={20} /> },
    { name: 'All Posts', href: '/admin/posts', icon: <FileText size={20} /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  ];

  // 2. The Logout Logic
  const handleSignOut = async () => {
    try {
      setLoading(true);
      
      // A. Kill the session in Supabase
      await supabase.auth.signOut();
      
      // B. Force Next.js to dump the cached "Admin" state
      router.refresh();
      
      // C. Redirect to Login
      router.push('/login');
      
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Error signing out');
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-black text-white font-serif tracking-tighter">
          Capital<span className="text-red-600">Admin</span>.
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-bold text-sm uppercase tracking-wide ${
                isActive 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleSignOut}
          disabled={loading}
          className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 w-full transition-colors text-sm font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
          {loading ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}