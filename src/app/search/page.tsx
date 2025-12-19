import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

/** * FIX: This line tells Next.js that this page relies on user-provided 
 * search params and cannot be pre-rendered as a static HTML file. 
 * This resolves the "Failed to collect configuration" error.
 */
export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // 1. Resolve the searchParams Promise (Required in Next.js 15+)
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';

  // 2. Fetch data from Supabase
  // We search both title and summary using case-insensitive ilike
  const { data: results, error } = await supabase
    .from('posts')
    .select('*')
    .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
    .is('deleted_at', null)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  // Handle Supabase connection or query errors
  if (error) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-red-600 font-bold">Search Error</h2>
        <p className="text-slate-500">{error.message}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-serif font-black text-slate-900 mb-2">
          Search Results
        </h1>
        <p className="text-slate-500 font-sans">
          Found {results?.length || 0} result{results?.length !== 1 && 's'} for{' '}
          <span className="font-bold text-slate-900">&quot;{query}&quot;</span>
        </p>
      </div>

      {/* Results List */}
      <div className="flex flex-col gap-8 max-w-4xl">
        {results && results.length > 0 ? (
          results.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="group flex flex-col sm:flex-row gap-6 border-b border-slate-100 pb-8 last:border-0"
            >
              {/* Optimized Image Container */}
              <div className="relative w-full sm:w-48 aspect-4/3 shrink-0 bg-slate-100 overflow-hidden rounded-md">
                {article.image_url ? (
                  <Image
                    src={article.image_url}
                    alt={article.title || 'Article image'}
                    fill
                    sizes="(max-width: 640px) 100vw, 192px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-slate-400 font-sans">
                    No Image
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center">
                {article.category && (
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-2 font-sans">
                    {article.category}
                  </span>
                )}
                <h2 className="text-xl font-bold font-serif mb-2 group-hover:text-red-700 transition-colors leading-tight">
                  {article.title}
                </h2>
                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed font-sans">
                  {article.summary}
                </p>
                <div className="mt-3 text-[10px] text-slate-400 font-bold font-sans uppercase">
                  {article.created_at
                    ? new Date(article.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}
                </div>
              </div>
            </Link>
          ))
        ) : (
          /* Empty State */
          <div className="py-20 bg-slate-50 rounded-lg text-center border border-dashed border-slate-200">
            <p className="text-slate-600 font-sans italic">
              No stories found matching your criteria.
            </p>
            <Link
              href="/"
              className="text-slate-900 font-bold text-sm mt-4 inline-block hover:underline font-sans"
            >
              Return to Homepage
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}