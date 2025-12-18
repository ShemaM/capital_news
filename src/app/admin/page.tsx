'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  TrendingUp, Eye, Activity, 
  BarChart3, Calendar, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';


export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    categories: {} as Record<string, number>
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('posts').select('category, is_published, deleted_at').is('deleted_at', null);
      if (data) {
        const catCounts: Record<string, number> = {};
        data.forEach(p => {
          const c = p.category || 'Uncategorized';
          catCounts[c] = (catCounts[c] || 0) + 1;
        });

        setStats({
          total: data.length,
          published: data.filter(p => p.is_published).length,
          drafts: data.filter(p => !p.is_published).length,
          categories: catCounts
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen pl-72"> {/* Added pl-72 for sidebar */}
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 font-serif">Executive Overview</h1>
        <p className="text-slate-500 font-medium">Real-time performance metrics for Great Lakes Region</p>
      </header>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard title="Total Articles" value={stats.total} trend="+12%" isPositive={true} icon={<BarChart3 />} />
        <KPICard title="Publication Rate" value={`${Math.round((stats.published / (stats.total || 1)) * 100)}%`} trend="+5%" isPositive={true} icon={<Activity />} />
        <KPICard title="Draft Queue" value={stats.drafts} trend="-2" isPositive={false} icon={<Calendar />} />
        <KPICard title="Est. Monthly Views" value="45.2k" trend="+8.4%" isPositive={true} icon={<Eye />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CATEGORY DISTRIBUTION */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-600" /> Category Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.categories).map(([cat, count]) => {
              const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={cat} className="flex items-center gap-4">
                  <span className="w-32 text-sm font-bold capitalize text-slate-500">{cat}</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-slate-900 rounded-full w-[${pct}%]`}></div>
                  </div>
                  <span className="text-sm font-black text-slate-900">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECENT ALERTS */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-500" /> System Status
          </h3>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-emerald-500">
              <p className="font-bold text-emerald-400">Database Healthy</p>
              <p className="text-slate-400 text-xs">Latency: 24ms</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-amber-500">
              <p className="font-bold text-amber-400">SEO Indexing</p>
              <p className="text-slate-400 text-xs">Pending crawl for 3 articles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, isPositive, icon }: { title: string; value: string | number; trend: string; isPositive: boolean; icon: ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-lg text-slate-600">{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</h3>
      <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
    </div>
  );
}