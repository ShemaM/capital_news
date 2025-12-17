import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

// 1. Force the page to act dynamically (fetches fresh news every time)
export const revalidate = 0;

export default async function Home() {
  // 2. Fetch the articles from Supabase
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .is("deleted_at", null) // Only active posts
    .eq("is_published", true)
    .order("created_at", { ascending: false }); // Newest first

  // Handle empty state
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Capital News</h1>
          <p className="text-slate-500">No news articles published yet.</p>
          <Link href="/admin" className="text-blue-600 hover:underline mt-4 inline-block">
            Go to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // 3. Layout Strategy
  const mainPost = posts[0]; // The newest story
  const sidePosts = posts.slice(1, 4); // Next 3 stories
  const olderPosts = posts.slice(4); // Everything else

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Main Article (Left) */}
          <div className="lg:col-span-2 group cursor-pointer">
            <Link href={`/article/${mainPost.id}`}>
              <div className="relative overflow-hidden rounded-xl shadow-sm mb-4 h-100">
                {mainPost.image_url ? (
                  <Image
                    src={mainPost.image_url}
                    alt={mainPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
                )}
                <div className="absolute bottom-0 left-0 bg-blue-900 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {mainPost.category}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors leading-tight">
                {mainPost.title}
              </h1>
              
              {mainPost.subtitle && (
                <p className="text-lg text-slate-600 italic font-serif mb-3 border-l-4 border-blue-900 pl-3">
                  {mainPost.subtitle}
                </p>
              )}
              
              <p className="text-slate-500 leading-relaxed line-clamp-3">
                {mainPost.summary}
              </p>
              <div className="mt-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
                {new Date(mainPost.created_at).toLocaleDateString()}
              </div>
            </Link>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2 mb-4">
              Top Stories
            </h2>
            
            {sidePosts.map((post) => (
              <Link href={`/article/${post.id}`} key={post.id} className="block group">
                <div className="flex gap-4 items-start">
                  {post.image_url && (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={96}
                      height={96}
                      className="object-cover rounded bg-slate-200 shrink-0"
                      unoptimized
                    />
                  )}
                  <div>
                    <span className="text-[10px] text-blue-700 font-bold uppercase block mb-1">
                      {post.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-blue-800 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}

            {sidePosts.length === 0 && (
               <div className="p-6 bg-slate-100 rounded text-center text-slate-400 text-sm italic">
                 More news coming soon...
               </div>
            )}
          </div>
        </div>

        {/* --- GRID SECTION (Older Posts) --- */}
        {olderPosts.length > 0 && (
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-serif font-bold mb-6">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {olderPosts.map((post) => (
                <Link href={`/article/${post.id}`} key={post.id} className="group">
                  <div className="overflow-hidden rounded-lg mb-3">
                    {post.image_url && (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        width={640}
                        height={192}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mb-1 font-bold uppercase">
                    {post.category} • {new Date(post.created_at).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-serif font-bold leading-tight group-hover:text-blue-800">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                    {post.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}