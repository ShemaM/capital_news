// In your [slug]/page.tsx - FIXED VERSION
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CommentSection from '@/components/article/CommentSection';

export const revalidate = 0;

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ category: string; slug: string }> 
}) {
  const { category, slug } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryForQuery = decodedCategory.replace(/-/g, ' ');

  // 1. Fetch the article
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .ilike("category", categoryForQuery)
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return notFound();
  }

  // 2. Check if comments are enabled from site_settings
  const { data: settings } = await supabase
    .from("site_settings")
    .select("public_comments")
    .eq("id", 1)
    .single();

  const commentsEnabled = settings?.public_comments || false;

  // 3. Fetch existing comments for this post WITH PROFILES
  const { data: comments } = await supabase
    .from("comments")
    .select(`
      *,
      profiles (
        full_name,
        username,
        avatar_url
      )
    `)
    .eq("post_id", post.id) // Make sure this matches your posts.id type!
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#fcfcfc] py-12 font-serif">
      <article className="max-w-3xl mx-auto px-4">
        
        {/* Navigation */}
        <Link 
          href={`/${category}`} 
          className="flex items-center gap-2 text-red-600 font-sans font-bold text-xs uppercase tracking-widest mb-8 hover:underline"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to {decodedCategory}
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-sans font-bold text-slate-500 uppercase tracking-tighter border-y border-slate-100 py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-red-600" />
              <span>{post.author_name || "Capital News Desk"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-red-600" />
              <span>{new Date(post.created_at).toLocaleDateString('en-GB')}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image_url && (
          <figure className="mb-10">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </figure>
        )}

        {/* Article Body */}
        <div 
          className="prose prose-lg prose-slate max-w-none font-sans leading-relaxed text-slate-800 mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comments Section - FIXED PROP PASSING */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <CommentSection
            articleId={post.id.toString()}
            initialComments={comments || []}
            commentsEnabled={commentsEnabled}
          />
        </div>
      </article>
    </main>
  );
}