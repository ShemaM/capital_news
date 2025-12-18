import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0;

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ category: string; slug: string }> 
}) {
  // 1. Await params to access category and slug (Required for Next.js 15+)
  const { category, slug } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryForQuery = decodedCategory.replace(/-/g, ' ');

  // DEBUG LOGS: Check your terminal/server console (where you ran npm run dev)
  console.log("--- DEBUG START ---");
  console.log("URL Category:", decodedCategory);
  console.log("URL Slug:", slug);

  // 2. Fetch the article
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .ilike("category", categoryForQuery) // ignore 'Politics' vs 'politics'
    .eq("slug", slug)                   // must match database exactly
    .single();

  if (error) {
    console.log("Supabase Error:", error.message);
  }
  
  if (!post) {
    console.log("Result: No article found in database for this slug.");
    return notFound(); // This triggers your 404 page
  }

  console.log("Result: Success! Found article:", post.title);
  console.log("--- DEBUG END ---");

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
          className="prose prose-lg prose-slate max-w-none font-sans leading-relaxed text-slate-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}