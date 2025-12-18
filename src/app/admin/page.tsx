'use client';

import { useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  BarChart3, 
  Users, 
  Newspaper, 
  TrendingUp, 
  ArrowUpRight,
  Globe,
  Clock
} from 'lucide-react';
import Link from 'next/link';


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCategories: 6,
    latestStory: '',
    publishedCount: 0
  });

  useEffect(() => {
    async function fetchStats() {
      const { data: posts } = await supabase
        .from('posts')
        .select('title, is_published')
        .is('deleted_at', null);
      
      if (posts) {
        setStats(prev => ({
          ...prev,
          totalPosts: posts.length,
          publishedCount: posts.filter(p => p.is_published).length,
          latestStory: posts[0]?.title || 'No stories yet'
        }));
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-serif">Editorial Analytics</h1>
          <p className="text-slate-500 font-medium">Monitoring Great Lakes Region Coverage</p>
        </div>
        <Link href="/admin/create" className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition-all">
          <Newspaper className="h-5 w-5" /> File New Report
        </Link>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Articles" value={stats.totalPosts} icon={<Newspaper />} color="blue" />
        <StatCard title="Live on Web" value={stats.publishedCount} icon={<Globe />} color="emerald" />
        <StatCard title="Active Categories" value={6} icon={<TrendingUp />} color="amber" />
        <StatCard title="Engagement" value="4.2k" icon={<Users />} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Breakdown */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-red-600" /> Category Distribution
          </h2>
          <div className="space-y-6">
             <CategoryProgress label="Politics" count={12} total={stats.totalPosts} color="bg-red-500" />
             <CategoryProgress label="Diplomacy" count={8} total={stats.totalPosts} color="bg-blue-500" />
             <CategoryProgress label="Technology" count={5} total={stats.totalPosts} color="bg-emerald-500" />
             <CategoryProgress label="Human Rights" count={15} total={stats.totalPosts} color="bg-amber-500" />
          </div>
        </div>

        {/* Latest Activity */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-500" /> Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="border-l-2 border-red-500 pl-4 py-2">
              <p className="text-xs text-slate-400 font-bold uppercase">Last Published</p>
              <p className="font-serif font-bold text-lg leading-tight">{stats.latestStory}</p>
            </div>
            <button className="w-full mt-6 py-3 border border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all">
              View Audit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: ReactNode; color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
          {icon}
        </div>
        <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-red-500 transition-colors" />
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</p>
      <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function CategoryProgress({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  // round to nearest 5% step and map to a CSS class defined in admin.css
  const rounded = Math.round(percentage / 5) * 5;
  const pctClass = `w-pct-${rounded}`;
  return (
    <div>
      <div className="flex justify-between mb-2 text-sm font-bold">
        <span>{label}</span>
        <span className="text-slate-400">{count} Articles</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div className={`${color} h-full transition-all duration-1000 ${pctClass}`}></div>
      </div>
    </div>
  );
}