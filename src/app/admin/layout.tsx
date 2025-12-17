import Link from 'next/link';
import { LayoutDashboard, PenTool, FileText, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <span className="text-white font-black font-serif text-xl tracking-tight">CN Admin.</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/create" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors">
            <PenTool className="h-5 w-5" />
            <span className="font-bold">Write New Story</span>
          </Link>
          <Link href="/admin/posts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="h-5 w-5" />
            <span className="font-medium">All Posts</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-slate-800 text-red-400 hover:text-red-300 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}