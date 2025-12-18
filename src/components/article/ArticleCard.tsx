import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface SupabaseArticle {
  id: number | string;
  title: string;
  summary: string;
  category: string;
  slug: string;
  image_url: string | null;
  author_name: string | null;
  created_at: string;
  is_published: boolean;
  deleted_at: string | null;
}

export function ArticleCard({ article }: { article: SupabaseArticle }) {
  return (
    <Link 
      href={`/${article.category}/${article.slug}`} 
      className="group flex flex-col gap-3 hover:no-underline"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-linear-to-br from-slate-100 to-slate-200">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-400 text-xs font-sans uppercase tracking-widest">
              No Image
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
          <span className="text-red-600 font-bold">{article.category}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(article.created_at))} ago</span>
        </div>
        <h3 className="text-xl font-bold font-serif leading-tight text-slate-900 group-hover:text-red-700 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed font-sans">
          {article.summary || "Read more about this story..."}
        </p>
        <div className="text-xs text-slate-400 font-sans font-bold uppercase tracking-tighter">
          By {article.author_name || "Staff Reporter"}
        </div>
      </div>
    </Link>
  );
}