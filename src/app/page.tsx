import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Snowflake, Gift } from 'lucide-react';

// Force fresh news every time
export const revalidate = 0;

export default async function HomePage() {
  const { data: articles, error } = await supabase
    .from('posts')
    .select('*')
    .is('deleted_at', null)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error || !articles || articles.length === 0) return null;

  // Organize the news
  const breaking = articles[0];
  const developing = articles.slice(1, 5);
  const feed = articles.slice(5, 13);

  return (
    <main className="min-h-screen bg-[#fffdfa]">
      
      {/* 1. TOP BAR */}
      <div className="bg-emerald-900 text-amber-200 py-2 border-b-2 border-amber-500/50">
        <div className="container mx-auto px-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <Snowflake className="h-3 w-3 animate-spin-slow" />
            <span>Capital News Dispatch</span>
          </div>
          <div className="hidden md:block">
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-2">
            <span>Great Lakes Region</span>
            <Sparkles className="h-3 w-3 text-amber-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* 2. HEADER */}
        <header className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
             <Gift className="h-40 w-40 text-emerald-800" />
          </div>
          <h1 className="text-7xl font-serif font-black text-slate-900 tracking-tighter mb-2 italic">
            Capital <span className="text-emerald-800">News</span>
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-amber-500"></div>
            <p className="text-amber-700 font-sans font-bold text-xs uppercase tracking-widest">
              Welcome Home for the Festivities
            </p>
            <div className="h-px w-20 bg-amber-500"></div>
          </div>
        </header>

        {/* 3. HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Main Breaking Story */}
          <div className="lg:col-span-8 group relative">
            <Link href={`/${breaking.category}/${breaking.slug}`}>  {/* <--- FIX HERE */}
              <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-amber-100 shadow-2xl">
                {breaking.image_url ? (
                  <Image src={breaking.image_url} alt={breaking.title ?? breaking.category} fill className="object-cover group-hover:scale-105 transition-all duration-1000" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">No Image</div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-emerald-950/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                    {breaking.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight">
                    {breaking.title}
                  </h2>
                </div>
              </div>
            </Link>
          </div>

          {/* Developing Stories Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-emerald-800 font-bold uppercase text-xs tracking-widest border-b border-amber-200 pb-2">
              <Sparkles className="h-4 w-4" /> Latest Briefings
            </h3>
            {developing.map((post) => (
              <Link key={post.id} href={`/${post.category.toLowerCase().replace(/\s+/g, '-')}/${post.slug}`} className="group block border-b border-slate-100 pb-4 last:border-0"> {/* <--- FIX HERE */}
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-tighter mb-1 block">{post.category}</span>
                <h4 className="font-serif font-bold text-lg leading-tight group-hover:text-emerald-700 transition-colors">
                  {post.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. NEWS GRID */}
        <section className="border-t-2 border-double border-amber-200 pt-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-black text-slate-900">The Newsroom Feed</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {feed.map((post) => (
              <Link key={post.id} href={`/${post.category}/${post.slug}`} className="group flex flex-col gap-4"> {/* <--- FIX HERE */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                  {post.image_url ? (
                    <Image src={post.image_url} alt={post.title ?? post.category} fill className="object-cover group-hover:opacity-80 transition-opacity" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs uppercase font-bold text-slate-400">No Image</div>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-2">{post.category}</span>
                  <h3 className="font-serif font-bold text-md leading-snug group-hover:underline decoration-amber-500">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}