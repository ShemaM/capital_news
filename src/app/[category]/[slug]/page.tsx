import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from 'isomorphic-dompurify';
import { EngagementSection } from "@/components/article/EngagementSection";
import { SupabaseArticle } from "@/lib/definitions";


export const revalidate = 60;

export default async function ArticlePage({ 
  params 
}: { 
  params: { category: string; slug: string } 
}) {
  const { category, slug } = params;
  
  // Normalize to lowercase
  const lowerCategory = decodeURIComponent(category).toLowerCase();
  const lowerSlug = decodeURIComponent(slug).toLowerCase();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", lowerSlug)
    .eq("category", lowerCategory)
    .is("deleted_at", null)
    .eq("is_published", true)
    .single();
  
  if (error || !post) {
    console.error(`Failed to fetch article for slug "${lowerSlug}" and category "${lowerCategory}"`, error);
    return notFound();
  }

  return renderArticle(post);
}

function renderArticle(post: SupabaseArticle) {
  // Sanitize the HTML content before rendering
  const sanitizedHtml = post.content ? DOMPurify.sanitize(post.content) : '';

  return (
    <main className="min-h-screen bg-[#fffdfa] py-12 font-serif">
      <article className="max-w-3xl mx-auto px-4">
        
        <Link 
          href={`/${post.category}`} 
          className="flex items-center gap-2 text-red-600 font-sans font-bold text-xs uppercase tracking-widest mb-8 hover:underline hover:no-underline"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to {post.category}
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-sans font-bold text-slate-500 uppercase tracking-tighter border-y border-slate-200 py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-red-600" />
              <span>{post.author_name || "Capital News Desk"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-red-600" />
              <span>{new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {post.image_url && (
          <figure className="mb-12">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            {(post.image_caption || post.image_credit) && (
              <figcaption className="mt-4 text-sm text-slate-500 font-sans italic flex justify-between">
                <span>{post.image_caption}</span>
                <span className="font-bold text-slate-400 uppercase text-[10px]">{post.image_credit}</span>
              </figcaption>
            )}
          </figure>
        )}

        {sanitizedHtml && (
          <div 
            className="prose prose-lg prose-slate max-w-none font-sans leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        )}

        <EngagementSection articleId={Number(post.id)} initialLikes={post.likes || 0} />

        <div className="mt-20 pt-8 border-t-2 border-slate-900 flex justify-center">
           <div className="h-10 w-10 bg-red-600 flex items-center justify-center rounded-sm">
              <span className="text-white font-black text-2xl font-serif">C</span>
           </div>
        </div>
      </article>
    </main>
  );
}