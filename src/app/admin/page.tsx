"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  category: string;
  created_at: string;
  is_published: boolean;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // The "Pro" Form Data
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",        // New Field
    category: "Politics",
    image_url: "",       // Restored
    image_caption: "",   // New Field
    summary: "",
    content: "",
  });

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    
    if (data) setPosts(data);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      fetchPosts();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('posts').insert([{ 
      title: formData.title,
      subtitle: formData.subtitle,          // Saving Subtitle
      category: formData.category,
      image_url: formData.image_url,        // Saving Image
      image_caption: formData.image_caption,// Saving Caption
      summary: formData.summary,
      content: formData.content,
      is_published: true 
    }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Article published successfully!");
      setFormData({ 
        title: "", subtitle: "", category: "Politics", 
        image_url: "", image_caption: "", summary: "", content: "" 
      });
      fetchPosts();
      router.refresh();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure? This moves the article to trash.")) return;
    
    const { error } = await supabase
      .from('posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) fetchPosts();
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Editorial Dashboard</h1>
        <div className="text-sm text-slate-500">
          User: <span className="font-semibold text-slate-900">Admin</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: EDITOR --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-2">Compose Article</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* HEADLINES */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Main Headline</label>
                  <input
                    required
                    className="w-full text-lg font-serif font-bold p-3 border-b-2 border-slate-200 focus:border-slate-900 outline-none transition-colors placeholder:font-sans placeholder:font-normal"
                    placeholder="e.g. Crisis in the East: Uvira Falls"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Subtitle / Deck</label>
                  <input
                    className="w-full text-slate-600 italic p-2 border-b border-slate-200 focus:border-slate-500 outline-none"
                    placeholder="e.g. The strategic city has reportedly fallen, cutting off key supply routes..."
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>
              </div>

              {/* MEDIA */}
              <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Cover Image URL</label>
                  <input
                    required
                    type="url"
                    className="w-full p-2 bg-white border border-slate-300 rounded text-sm"
                    placeholder="https://..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Image Caption</label>
                  <input
                    className="w-full p-2 bg-white border border-slate-300 rounded text-sm"
                    placeholder="PHOTO: AFP/GETTY IMAGES"
                    value={formData.image_caption}
                    onChange={(e) => setFormData({ ...formData, image_caption: e.target.value })}
                  />
                </div>
              </div>

              {/* METADATA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
                  <select
                    id="category"
                    className="w-full p-2 border border-slate-300 rounded"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Politics</option>
                    <option>Conflict Monitor</option>
                    <option>Business</option>
                    <option>Sports</option>
                  </select>
                </div>
              </div>

              {/* CONTENT */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Summary (Homepage)</label>
                  <textarea
                    required
                    className="w-full p-3 border border-slate-300 rounded h-24 text-sm"
                    placeholder="Brief intro..."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Body Content</label>
                  <p className="text-xs text-slate-400 mb-2">Use &lt;blockquote&gt; for quotes, &lt;b&gt; for bold.</p>
                  <textarea
                    required
                    className="w-full p-4 border border-slate-300 rounded h-80 font-mono text-sm leading-relaxed"
                    placeholder="Paste your full article text here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Story"}
              </button>
            </form>
          </div>
        </div>

        {/* --- RIGHT COLUMN: MANAGE --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold uppercase text-slate-500 mb-4">Recent Stories</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="group flex justify-between items-start pb-4 border-b border-slate-50 last:border-0">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1">{post.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{post.category}</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-400">{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="opacity-0 group-hover:opacity-100 text-xs text-red-500 hover:text-red-700 transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {posts.length === 0 && <p className="text-sm text-slate-400 italic">No stories yet.</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}