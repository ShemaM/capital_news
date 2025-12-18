'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Eye, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminPostsPage() {
  interface Post {
    id: string;
    title?: string | null;
    category?: string | null;
    slug?: string | null;
    created_at?: string | null;
    deleted_at?: string | null;
    [key: string]: unknown;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      // Fetch real data from Supabase
      const { data } = await supabase
        .from('posts')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center">Loading Newsroom...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-serif">Newsroom Dashboard</h1>
        <Link href="/admin/create" className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold">
          <Plus className="h-4 w-4" /> New Story
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b text-xs uppercase font-bold text-slate-500">
            <tr>
              <th className="px-6 py-4">Headline</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPosts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="px-6 py-4 capitalize text-sm">{post.category}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                   {/* This link lets you preview the article safely */}
                   <Link href={`/${post.category}/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-600">
                     <Eye className="h-4 w-4" />
                   </Link>
                   <button type="button" aria-label="Delete post" title="Delete post" className="p-2 text-slate-400 hover:text-red-600">
                     <Trash2 className="h-4 w-4" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}