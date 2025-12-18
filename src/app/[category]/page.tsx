import { supabase } from "@/lib/supabase";
import { ArticleCard } from "@/components/article/ArticleCard";

export const revalidate = 0;

// 1. Type params as a Promise
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  // 2. AWAIT the params here. This fixes the crash.
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .ilike("category", decodedCategory)
    .is("deleted_at", null)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-20 text-center text-red-600">Error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 font-serif">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 border-b-4 border-slate-900 pb-4">
          <h1 className="text-5xl font-black text-slate-900 capitalize tracking-tighter">
            {decodedCategory}
          </h1>
        </div>

        {!posts || posts.length === 0 ? (
          <div className="p-10 text-center border-2 border-dashed border-slate-300 rounded-xl">
            <p className="text-slate-500 italic">No stories found in {decodedCategory}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <ArticleCard key={post.id} article={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}