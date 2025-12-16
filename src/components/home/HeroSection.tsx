import Link from 'next/link';
import Image from 'next/image';
import { latestArticles } from '@/lib/placeholder-data'; // Re-using our mock data

export function HeroSection() {
  // Logic: First article is "Hero", next two are "Sub-Hero"
  const mainArticle = latestArticles[0];
  const sideArticles = latestArticles.slice(1, 3);

  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-12">
      
      {/* LEFT: Main Featured Story (Takes up 2 columns) */}
      <Link href={`/${mainArticle.category}/${mainArticle.slug}`} className="group relative md:col-span-2 overflow-hidden rounded-xl bg-slate-100 min-h-100 flex items-end">
        {/* Full Background Image */}
        <Image
          src={mainArticle.coverImage}
          alt={mainArticle.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        {/* Gradient Overlay so text is readable */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Text Content */}
        <div className="relative z-10 p-6 md:p-8">
          <span className="mb-3 inline-block rounded bg-red-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
            Breaking
          </span>
          <h2 className="mb-2 text-3xl font-black font-serif text-white md:text-5xl leading-tight group-hover:underline decoration-red-500 decoration-2 underline-offset-4">
            {mainArticle.title}
          </h2>
          <p className="text-slate-200 md:text-lg max-w-2xl line-clamp-2">
            {mainArticle.excerpt}
          </p>
        </div>
      </Link>


      {/* RIGHT: Top Stories (Stack of 2) */}
      <div className="flex flex-col gap-8 md:gap-4">
        {sideArticles.map((article) => (
          <Link key={article.id} href={`/${article.category}/${article.slug}`} className="group relative flex-1 overflow-hidden rounded-xl bg-slate-100 min-h-50 flex items-end">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="relative z-10 p-5">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                {article.category}
              </span>
              <h3 className="mt-1 text-xl font-bold font-serif text-white leading-tight group-hover:text-red-200">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}