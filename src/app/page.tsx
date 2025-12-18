import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Sparkles, Snowflake, Gift } from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  const { data: articles, error } = await supabase
    .from('posts')
    .select('*')
    .is('deleted_at', null)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error || !articles || articles.length === 0) return null;

  const breaking = articles[0];
  const festiveStories = articles.slice(1, 5);

  return (
    <main className="min-h-screen bg-[#fffdfa]"> {/* Warm parchment background */}
      
      {/* 1. FESTIVE TOP BAR */}
      <div className="bg-emerald-900 text-amber-200 py-2 border-b-2 border-amber-500/50">
        <div className="container mx-auto px-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <Snowflake className="h-3 w-3 animate-spin-slow" />
            <span>Seasonal Greetings from the Newsroom</span>
          </div>
          <div className="hidden md:block">
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-2">
            <span>Peace in the Great Lakes</span>
            <Sparkles className="h-3 w-3 text-amber-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* 2. THE HOLIDAY WELCOME */}
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

        {/* 3. PACKED HERO GRID WITH FESTIVE ACCENTS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Breaking/Priority Story */}
          <div className="lg:col-span-8 group relative">
            <Link href={`/article/${breaking.id}`}>
              <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-amber-100 shadow-2xl">
                <Image
                  src={breaking.image_url || '/placeholder.jpg'}
                  alt={breaking.title || 'Breaking story image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-emerald-950/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                    Critical Update
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif font-black text-white leading-tight">
                    {breaking.title}
                  </h2>
                </div>
              </div>
            </Link>
          </div>

          {/* Festive Column: Developing Stories */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-emerald-800 font-bold uppercase text-xs tracking-widest border-b border-amber-200 pb-2">
              <Sparkles className="h-4 w-4" /> Latest Briefings
            </h3>
            {festiveStories.map((post) => (
              <Link key={post.id} href={`/article/${post.id}`} className="group block border-b border-slate-100 pb-4 last:border-0">
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-tighter mb-1 block">{post.category}</span>
                <h4 className="font-serif font-bold text-lg leading-tight group-hover:text-emerald-700 transition-colors">
                  {post.title}
                </h4>
              </Link>
            ))}
            <div className="mt-auto p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
               <p className="text-xs text-emerald-800 font-medium italic">&ldquo;Dedicated to truth, even in the season of celebration.&rdquo;</p>
            </div>
          </div>
        </section>

        {/* 4. DENSE SEASONAL FEED */}
        <section className="border-t-2 border-double border-amber-200 pt-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-black text-slate-900">The Newsroom Feed</h2>
            <Link href="/archive" className="text-xs font-bold uppercase text-amber-700 hover:text-emerald-800 transition-colors">
              Browse All Stories →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {articles.slice(5, 13).map((post) => (
              <Link key={post.id} href={`/article/${post.id}`} className="group flex flex-col gap-4">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                  <Image
                    src={post.image_url || '/placeholder.jpg'}
                    alt={post.title || ''}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-md leading-snug group-hover:underline decoration-amber-500">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 font-sans">{post.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}