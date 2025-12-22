'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Edit, Trash2, Globe, Lock, ArchiveRestore } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  slug: string;
  category?: string | null;
  is_published: boolean;
  created_at: string | null;
  deleted_at?: string | null;
}

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .is('deleted_at', null) // Only show active posts
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  useEffect(() => {
    const load = async () => {
      await fetchPosts();
    };
    void load();
  }, []);

  const handleDelete = async (id: number) => {
    if(!confirm("Are you sure? This moves the post to trash.")) return;
    await supabase.from('posts').update({ deleted_at: new Date().toISOString() }).eq('id', id);
    fetchPosts(); 
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.is_published;
    if (filter === 'draft') return !post.is_published;
    return true;
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen pl-72">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-serif">All Posts</h1>
          <p className="text-slate-500 font-medium">Manage your editorial content</p>
        </div>
        <div className="flex gap-3">
            {/* LINK TO TRASH PAGE */}
            <Link href="/admin/posts/trash" className="bg-white border border-slate-200 text-slate-600 px-4 py-3 rounded-lg font-bold text-sm uppercase hover:bg-slate-50 transition-colors flex items-center gap-2">
                <ArchiveRestore size={18} /> Trash
            </Link>
            <Link href="/admin/create" className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm uppercase hover:bg-red-700 transition-colors">
            + New Article
            </Link>
        </div>
      </header>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex gap-4">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${filter === 'all' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}>All ({posts.length})</button>
        <button onClick={() => setFilter('published')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${filter === 'published' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500'}`}>Published</button>
        <button onClick={() => setFilter('draft')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${filter === 'draft' ? 'bg-amber-50 text-amber-600' : 'text-slate-500'}`}>Drafts</button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 text-xs font-black uppercase text-slate-500 tracking-wider">Status</th>
              <th className="text-left p-4 text-xs font-black uppercase text-slate-500 tracking-wider">Title</th>
              <th className="text-left p-4 text-xs font-black uppercase text-slate-500 tracking-wider">Category</th>
              <th className="text-left p-4 text-xs font-black uppercase text-slate-500 tracking-wider">Date</th>
              <th className="text-right p-4 text-xs font-black uppercase text-slate-500 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPosts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  {post.is_published ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
                      <Globe size={12} /> Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                      <Lock size={12} /> Draft
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <p className="font-bold text-slate-900 font-serif">{post.title}</p>
                  <p className="text-xs text-slate-400 font-mono mt-1">/{post.slug}</p>
                </td>
                <td className="p-4">
                  <span className="capitalize text-sm font-medium text-slate-600">{post.category}</span>
                </td>
                <td className="p-4 text-sm text-slate-500">
                  {post.created_at ? new Date(post.created_at).toLocaleDateString() : '—'}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {/* FIXED: LINK TO EDIT PAGE */}
                    <Link 
                        href={`/admin/posts/edit/${post.id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    
                    <button type="button" onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPosts.length === 0 && (
          <div className="p-12 text-center text-slate-400 font-medium">No posts found in this view.</div>
        )}
      </div>
    </div>
  );
}