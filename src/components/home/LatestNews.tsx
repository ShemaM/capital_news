import { ArticleCard } from '@/components/article/ArticleCard';
import { latestArticles } from '@/lib/placeholder-data';

export function LatestNews() {
  return (
    <section className="py-12">
      <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold font-serif text-slate-900">Latest News</h2>
        <a href="/archive" className="text-sm font-medium text-red-600 hover:text-red-700">
          View All &rarr;
        </a>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {latestArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}