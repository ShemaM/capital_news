import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EngagementSection } from '@/components/article/EngagementSection'; // Keep your component

// Force fresh data
export const revalidate = 0;

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Fetch the Main Article
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  // 2. Fetch "Most Read" (Just getting the latest 4 stories for the sidebar)
  const { data: sidebarPosts } = await supabase
    .from("posts")
    .select("id, title, category, created_at, image_url")
    .neq("id", id) // Don't show the current article in the sidebar
    .is("deleted_at", null)
    .eq("is_published", true)
    .limit(4)
    .order("created_at", { ascending: false });

  return (
    <div className="bg-white min-h-screen font-serif text-slate-900 pb-20">
      
      {/* 1. Main Grid Layout (Two Columns) */}
      <div className="container mx-auto px-4 pt-8 lg:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl">
        
        {/* === LEFT COLUMN: MAIN ARTICLE (Spans 8 cols) === */}
        <main className="lg:col-span-8">
          
          {/* A. CATEGORY PILL */}
          <div className="mb-6">
            <Link 
              href={`/category/${post.category}`}
              className="inline-block bg-blue-900 text-white text-[10px] font-sans font-bold uppercase tracking-[0.15em] px-3 py-1 hover:bg-slate-900 transition-colors"
            >
              {post.category}
            </Link>
          </div>

          {/* B. HEADLINE */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight text-slate-900">
            {post.title}
          </h1>

          {/* C. SUBTITLE / DECK (If it exists) */}
          {post.subtitle && (
            <div className="mb-6 pl-4 border-l-4 border-blue-900">
              <p className="text-xl md:text-2xl text-slate-600 italic leading-relaxed font-sans font-light">
                {post.subtitle}
              </p>
            </div>
          )}

          {/* D. AUTHOR & DATE */}
          <div className="flex items-center justify-between border-t border-b border-slate-100 py-4 mb-8 font-sans text-xs font-bold uppercase tracking-wider text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-slate-900">Capital News Staff</span>
              <span className="text-slate-300">|</span>
              <span>Correspondent</span>
            </div>
            <div>
              {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>

          {/* E. HERO IMAGE */}
          {post.image_url && (
            <figure className="mb-10 relative">
              <div className="relative aspect-3/2 w-full overflow-hidden bg-slate-100 rounded-lg shadow-sm">
                {/* Use Next.js Image for automatic optimization */}
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              {post.image_caption && (
                <figcaption className="mt-2 flex justify-between text-xs font-sans text-slate-500">
                   <span className="font-medium">{post.image_caption}</span>
                </figcaption>
              )}
            </figure>
          )}

          {/* F. BODY CONTENT */}
          <div className="prose prose-lg prose-slate max-w-none 
            prose-p:mb-6 prose-p:leading-loose prose-p:text-slate-800
            prose-headings:font-sans prose-headings:font-bold prose-headings:uppercase
            prose-blockquote:border-l-2 prose-blockquote:border-blue-900 prose-blockquote:pl-6 prose-blockquote:italic
            whitespace-pre-wrap">
            
            {post.content}
            
          </div>

          {/* G. ENGAGEMENT */}
          <div className="mt-12">
             <EngagementSection />
          </div>

        </main>

        {/* === RIGHT COLUMN: SIDEBAR (Spans 4 cols) === */}
        <aside className="hidden lg:block lg:col-span-4 pl-8 border-l border-slate-100">
          <div className="sticky top-24">
            
            {/* 1. TOP STORIES SIDEBAR */}
            <div className="mb-12">
              <h3 className="flex items-center gap-2 text-xs font-sans font-bold text-blue-900 uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                Top Stories
              </h3>

              <div className="flex flex-col gap-6">
                {sidebarPosts?.map((item, index) => (
                  <Link key={item.id} href={`/article/${item.id}`} className="group flex gap-4 items-baseline">
                    <span className="text-3xl font-black text-slate-200 font-sans group-hover:text-blue-100 transition-colors">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-lg leading-tight group-hover:text-blue-900 transition-colors text-slate-800">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase mt-1 block">
                         {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
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