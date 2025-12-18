import { supabase } from "@/lib/supabase";
import { ArticleCard } from "@/components/article/ArticleCard";
import { SupabaseArticle } from "@/lib/definitions";

// Revalidate every minute
export const revalidate = 60;

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);

  // Fetch articles from Supabase matching the current category
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .ilike("category", decodedCategory)
    .is("deleted_at", null)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-20 text-center text-red-600 font-sans">Database Error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b-4 border-slate-900 pb-4 flex justify-between items-end">
          <h1 className="text-5xl font-black text-slate-900 capitalize tracking-tighter">
            {decodedCategory}
          </h1>
          <span className="text-slate-400 font-sans font-bold text-xs uppercase tracking-[0.3em]">
            Capital News Dispatch
          </span>
        </div>

        {/* Article Grid */}
        {!posts || posts.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-sans italic text-lg">No stories currently filed in {decodedCategory}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: SupabaseArticle) => (
              <ArticleCard article={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}