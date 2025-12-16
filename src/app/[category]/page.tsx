import Link from 'next/link';
import Image from 'next/image';
import { latestArticles } from '@/lib/placeholder-data';
import { formatDistanceToNow } from 'date-fns';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  // 1. Filter articles by the category in the URL
  const categoryArticles = latestArticles.filter(
    (article) => article.category === category
  );

  // If the category doesn't exist or has no articles, show 404
  // (Optional: You could remove this if you want empty categories to render)
  if (categoryArticles.length === 0) {
    // For now, let's just log it and maybe allow it to render an empty state
    // notFound(); 
  }

  // Capitalize for display (e.g., "politics" -> "Politics")
  const title = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-6">
        <h1 className="text-5xl font-black font-serif text-slate-900 mb-2">
          {title}
        </h1>
        <p className="text-slate-500 text-lg">
          Latest coverage and analysis on {title}.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {categoryArticles.map((article) => (
          <Link key={article.id} href={`/${article.category}/${article.slug}`} className="group flex flex-col gap-4">
            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-slate-100">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                 <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
                 <span>•</span>
                 <span className="text-red-600">{article.author.name}</span>
              </div>
              
              <h2 className="text-2xl font-bold font-serif leading-tight group-hover:text-red-700 transition-colors">
                {article.title}
              </h2>
              
              <p className="text-slate-600 line-clamp-3 text-sm leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State Message */}
      {categoryArticles.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-500 text-lg">No articles found in this category yet.</p>
          <Link href="/" className="text-red-600 font-bold hover:underline mt-2 inline-block">
            Back to Home
          </Link>
        </div>
      )}

    </main>
  );
}