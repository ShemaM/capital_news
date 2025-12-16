import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { latestArticles } from '@/lib/placeholder-data';
import { EngagementSection } from '@/components/article/EngagementSection';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = latestArticles.find((p) => p.slug === slug);

  if (!article) {
    notFound();
  }

  // Mock data for the "Most Read" sidebar
  const mostRead = latestArticles.slice(0, 4);

  // Type guard to safely check for legacy 'caption' property without using 'any'
  function hasLegacyCaption(obj: unknown): obj is { caption?: string } {
    return !!obj && typeof obj === 'object' && 'caption' in obj;
  }

  const caption = article.imageCaption ?? (hasLegacyCaption(article) ? article.caption : undefined);

  return (
    <div className="bg-white min-h-screen font-serif text-slate-900 pb-20">
      
      {/* 1. Main Grid Layout (Two Columns on Desktop) */}
      <div className="container mx-auto px-4 pt-8 lg:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl">
        
        {/* === LEFT COLUMN: MAIN ARTICLE (Spans 8 cols) === */}
        <main className="lg:col-span-8">
          
          {/* A. CATEGORY PILL */}
          <div className="mb-6">
            <Link 
              href={`/${article.category}`}
              className="inline-block bg-red-700 text-white text-[10px] font-sans font-bold uppercase tracking-[0.15em] px-3 py-1 hover:bg-slate-900 transition-colors"
            >
              {article.category}
            </Link>
          </div>

          {/* B. HEADLINE */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
            {article.title}
          </h1>

          {/* C. EXCERPT (Lead) */}
          <div className="mb-6 pl-4 border-l-4 border-red-700">
            <p className="text-xl md:text-2xl text-slate-600 italic leading-relaxed font-sans font-light">
              {article.excerpt}
            </p>
          </div>

          {/* D. AUTHOR & DATE LINE */}
          <div className="flex items-center justify-between border-t border-b border-slate-100 py-4 mb-8 font-sans text-xs font-bold uppercase tracking-wider text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-slate-900">{article.author.name}</span>
              <span className="text-slate-300">|</span>
              <span>Correspondent</span>
            </div>
            <div>
              {format(new Date(article.publishedAt), 'MMM d, yyyy')}
            </div>
          </div>

          {/* E. HERO IMAGE */}
          <figure className="mb-10 relative">
            <div className="relative aspect-3/2 w-full overflow-hidden bg-slate-100">
              <Image
                src={article.coverImage}
                alt={caption || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {(caption || article.imageCredit) && (
              <figcaption className="mt-2 flex justify-between text-xs font-sans text-slate-500">
                 <span className="font-medium">{caption}</span>
                 <span className="uppercase tracking-widest">{article.imageCredit && `Photo: ${article.imageCredit}`}</span>
              </figcaption>
            )}
          </figure>

          {/* F. BODY CONTENT */}
          <div className="prose prose-lg prose-stone max-w-none 
            prose-p:mb-6 prose-p:leading-loose prose-p:text-slate-800
            prose-headings:font-sans prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-sm prose-headings:mt-10
            prose-blockquote:border-l-2 prose-blockquote:border-red-700 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-700 prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:not-italic
          ">
            
            {/* Paragraph 1 with Drop Cap */}
            <p>
              <span className="float-left mr-3 text-7xl font-black text-slate-900 leading-[0.7] pt-3 font-serif">T</span>
              he situation regarding <strong>{article.title}</strong> has reached a critical point this week. 
              Local sources confirm that tensions have been escalating in the sector, drawing the attention of regional observers.
              &quot;We are seeing unprecedented developments,&quot; stated a local civil society leader who wished to remain anonymous for security reasons. 
              This report highlights the urgent need for attention in the region.
            </p>

            <h3>Strategic Implications</h3>
            <p>
              The recent events described as &quot;{article.excerpt}&quot; have triggered a series of responses from local authorities. 
              According to data collected by The Monitor, this fits a pattern observed over the last three months.
              Supply chains have been disrupted for over 48 hours, leaving residents in a precarious position.
            </p>

            {/* Pull Quote Style */}
            <div className="my-10 p-8 bg-slate-50 border-y border-slate-200">
              <p className="text-2xl italic font-serif text-slate-800 text-center leading-relaxed">
                &quot;For the residents of the High Plateaux, this is not just a political abstraction but a daily reality of survival.&quot;
              </p>
            </div>

            <p>
              As night falls over the region, the sound of distant activity serves as a grim reminder that stability remains elusive. 
              Markets remain closed, and the price of basic goods has tripled in the last 48 hours. 
              We will continue to track developments as they happen.
            </p>
          </div>

          {/* G. TAGS */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap gap-2">
             <span className="text-xs font-sans font-bold text-slate-400 uppercase tracking-widest mr-2 py-1">Filed Under</span>
             {['Conflict Monitor', 'South Kivu', 'Great Lakes', 'Security'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-sans font-bold uppercase tracking-wider hover:bg-slate-200 cursor-pointer transition-colors border border-slate-200">
                    #{tag}
                </span>
             ))}
          </div>

          {/* H. ENGAGEMENT */}
          <EngagementSection />

        </main>


        {/* === RIGHT COLUMN: SIDEBAR (Spans 4 cols, Hidden on Mobile) === */}
        <aside className="hidden lg:block lg:col-span-4 pl-8 border-l border-slate-100">
          <div className="sticky top-24">
            
            {/* 1. MOST READ SECTION */}
            <div className="mb-12">
              <h3 className="flex items-center gap-2 text-xs font-sans font-bold text-red-600 uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Most Read / Live
              </h3>

              <div className="flex flex-col gap-6">
                {mostRead.map((item, index) => (
                  <Link key={item.id} href={`/${item.category}/${item.slug}`} className="group flex gap-4 items-baseline">
                    <span className="text-3xl font-black text-slate-200 font-sans group-hover:text-red-100 transition-colors">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-lg leading-tight group-hover:text-red-700 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase mt-1 block">
                        {format(new Date(item.publishedAt), 'MMM d')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. AD PLACEHOLDER */}
            <div className="w-full aspect-3/4 bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center p-6">
               <span className="text-xs font-sans font-bold text-slate-400 uppercase tracking-widest mb-2">Advertisement</span>
               <p className="font-serif text-slate-300 italic">Support Independent News</p>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}