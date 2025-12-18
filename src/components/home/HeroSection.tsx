'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Article {
  id: number | string;
  image_url?: string | null;
  title?: string | null;
  summary?: string | null;
  category?: string | null;
  slug?: string | null;
  author_name?: string | null;
  created_at?: string | null;
}

export function HeroSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHero() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .is('deleted_at', null)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (data) setArticles(data);
      setLoading(false);
    }
    fetchHero();
  }, []);

  if (loading) return <div className="h-96 w-full bg-slate-100 animate-pulse rounded-2xl" />;
  
  if (articles.length === 0) return <div className="h-96 w-full bg-slate-100 rounded-2xl flex items-center justify-center">
    <p className="text-slate-400 font-sans">No featured articles available</p>
  </div>;

  const [main, ...others] = articles;

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN FEATURE: Editorial Style */}
        <div className="lg:col-span-8 group">
          <Link href={`/${main.category}/${main.slug}`}>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-200 mb-6">
              {main.image_url ? (
                <Image
                  src={main.image_url}
                  alt={main.title ?? ''}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <span className="text-slate-400 font-sans text-sm">Featured Image</span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm">
                  Top Story
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-4 leading-[1.1] group-hover:text-red-700 transition-colors">
              {main.title}
            </h1>
            <p className="text-lg text-slate-600 font-sans leading-relaxed line-clamp-3 max-w-3xl">
              {main.summary}
            </p>
          </Link>
        </div>

        {/* SIDEBAR FEATURES: Compact Vertical Stack */}
        <div className="lg:col-span-4 space-y-8 border-l border-slate-200 lg:pl-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Trending in {main.category}
          </h2>
          {others.map((post) => (
            <Link 
              key={post.id} 
              href={`/${post.category}/${post.slug}`} 
              className="group block hover:no-underline"
            >
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title ?? ''}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-600 uppercase mb-1 block tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg leading-snug text-slate-900 group-hover:text-red-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}