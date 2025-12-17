import Link from 'next/link';
import Image from 'next/image';
import { latestArticles } from '@/lib/placeholder-data';

// 1. We accept searchParams as a Promise (Next.js 15/16 standard)
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // 2. Await the params to get the query string
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.toLowerCase() || '';

  // 3. Filter the articles
  const results = latestArticles.filter((article) => 
    article.title.toLowerCase().includes(query) || 
    article.excerpt.toLowerCase().includes(query)
  );

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-serif font-black text-slate-900 mb-2">
          Search Results
        </h1>
        <p className="text-slate-500">
          Found {results.length} result{results.length !== 1 && 's'} for <span className="font-bold text-slate-900">&quot;{resolvedParams.q || ''}&quot;</span>
        </p>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl">
        {results.map((article) => (
          <Link key={article.id} href={`/${article.category}/${article.slug}`} className="group flex flex-col sm:flex-row gap-6 border-b border-slate-100 pb-8 last:border-0">
            {/* Image Thumbnail */}
            <div className="relative w-full sm:w-48 aspect-4/3 shrink-0 bg-slate-100 overflow-hidden rounded-md">
              <Image 
                src={article.coverImage} 
                alt={article.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                {article.category}
              </span>
              <h2 className="text-xl font-bold font-serif mb-2 group-hover:text-red-700 transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}

        {results.length === 0 && (
          <div className="py-12 bg-slate-50 rounded-lg text-center border border-slate-100">
             <p className="text-slate-600 font-medium">No stories found matching your criteria.</p>
             <Link href="/" className="text-red-600 font-bold text-sm mt-4 inline-block hover:underline">
               Return to Homepage
             </Link>
          </div>
        )}
      </div>
    </main>
  );
}