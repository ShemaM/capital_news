import Link from 'next/link';
import Image from 'next/image';

interface Article {
  category: string;
  slug: string;
  image_url?: string | null;
  title: string;
  summary?: string | null;
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link 
      // THIS is the line that fixes the URL
      href={`/${article.category}/${article.slug}`} 
      className="group flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all"
    >
      <div className="aspect-video bg-slate-100 overflow-hidden relative">
        {article.image_url ? (
          <Image
            src={article.image_url!}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-xs font-bold uppercase">No Image</div>
        )}
      </div>
      
      <div className="p-5 flex flex-col gap-3">
        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
          {article.category}
        </span>
        <h3 className="text-xl font-bold font-serif leading-tight text-slate-900 group-hover:text-red-700">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 font-sans">
          {article.summary}
        </p>
      </div>
    </Link>
  );
}