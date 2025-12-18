'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenTool, FileText, Settings, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Create Post/Articles', href: '/admin/create', icon: <PenTool size={20} /> },
    { name: 'All Posts', href: '/admin/posts', icon: <FileText size={20} /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  ];

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
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 w-full transition-colors text-sm font-bold uppercase">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}