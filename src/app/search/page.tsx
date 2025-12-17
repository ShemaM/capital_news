import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

// 1. Next.js 15/16 standard for dynamic search params
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';

  // 2. Fetch real data from Supabase using the 'or' filter for titles or summaries
  // We use .ilike to make the search case-insensitive
  const { data: results, error } = await supabase
    .from('posts')
    .select('*')
    .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
    .is('deleted_at', null)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-20 text-center text-red-600">Search Error: {error.message}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-serif font-black text-slate-900 mb-2">
          Search Results
        </h1>
        <p className="text-slate-500 font-sans">
          Found {results?.length || 0} result{results?.length !== 1 && 's'} for <span className="font-bold text-slate-900">&quot;{query}&quot;</span>
        </p>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl">
        {results?.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`} className="group flex flex-col sm:flex-row gap-6 border-b border-slate-100 pb-8 last:border-0">
            
            {/* 3. Optimized Image Rendering using next/image */}
            <div className="relative w-full sm:w-48 aspect-4/3 shrink-0 bg-slate-100 overflow-hidden rounded-md">
              {article.image_url ? (
                <Image
                  src={article.image_url}
                  alt={article.title || 'Article image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-slate-400 font-sans">No Image</div>
              )}
            </div>
            
            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-2 font-sans">
                {article.category}
              </span>
              <h2 className="text-xl font-bold font-serif mb-2 group-hover:text-red-700 transition-colors leading-tight">
                {article.title}
              </h2>
              <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed font-sans">
                {article.summary}
              </p>
              <div className="mt-3 text-[10px] text-slate-400 font-bold font-sans uppercase">
                {article.created_at ? new Date(article.created_at).toLocaleDateString() : ''}
              </div>
            </div>
          </Link>
        ))}

        {(!results || results.length === 0) && (
          <div className="py-20 bg-slate-50 rounded-lg text-center border border-dashed border-slate-200">
             <p className="text-slate-600 font-sans italic">No stories found matching your criteria.</p>
             <Link href="/" className="text-slate-900 font-bold text-sm mt-4 inline-block hover:underline font-sans">
               Return to Homepage
             </Link>
          </div>
        )}
      </div>
    </main>
  );
}