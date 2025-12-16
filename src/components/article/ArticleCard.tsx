import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '@/lib/definitions';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/${article.category}/${article.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-slate-100">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
          <span className="text-red-600">{article.category}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
        </div>
        <h3 className="text-xl font-bold font-serif leading-tight group-hover:text-red-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}