import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

// Force fresh data
export const revalidate = 0;

// The "export default" is mandatory for Next.js pages
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  // 1. Fetch data from Supabase
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .ilike("category", decodedCategory)
    .is("deleted_at", null)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-20 text-center text-red-600">Database Connection Error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 border-b border-slate-200 pb-4">
          <h1 className="text-4xl font-bold text-slate-900 capitalize tracking-tight">
            {decodedCategory} News
          </h1>
        </div>

        {!posts || posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 font-sans italic">No stories found in {decodedCategory}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/article/${post.id}`} key={post.id} className="group block h-full">
                <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                  
                  {/* Use Next.js Image for optimized delivery (unoptimized to avoid external loader config) */}
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    {post.image_url ? (
                      <Image
                        src={post.image_url}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400 text-xs font-sans">No Image</div>
                    )}
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-900 transition-colors">
                      {String(post.title || "Untitled Article")}
                    </h2>
                    
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1 font-sans">
                      {String(post.summary || "Read more about this story...")}
                    </p>

                    <div className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-50">
                      {post.created_at ? new Date(post.created_at).toLocaleDateString() : "Recently Published"}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}