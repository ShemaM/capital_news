'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { RotateCcw, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  category?: string | null;
  deleted_at: string;
}

export default function TrashPage() {
  const [deletedPosts, setDeletedPosts] = useState<Post[]>([]);

  // 1. Fetch ONLY deleted posts
  async function fetchDeletedPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .not('deleted_at', 'is', null) // The logic is inverted here
      .order('deleted_at', { ascending: false });
    
    if (data) setDeletedPosts(data);
  }

  useEffect(() => {
    (async () => {
      await fetchDeletedPosts();
    })();
  }, []);

  // 2. Restore Function (Sets deleted_at back to NULL)
  const handleRestore = async (id: number) => {
    const { error } = await supabase
        .from('posts')
        .update({ deleted_at: null })
        .eq('id', id);
    
    if (!error) fetchDeletedPosts();
  };

  // 3. Permanent Delete (Scary!)
  const handlePermanentDelete = async (id: number) => {
    if(!confirm("PERMANENT ACTION: This post will be gone forever. Continue?")) return;
    
    const { error } = await supabase
        .from('posts')
        .delete() // Actual SQL Delete
        .eq('id', id);
        
    if (!error) fetchDeletedPosts();
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen pl-72">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-serif flex items-center gap-3">
             Trash Can
          </h1>
          <p className="text-slate-500 font-medium">Restore deleted articles or remove them forever</p>
        </div>
      </header>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-50 border-b border-red-100">
            <tr>
              <th className="text-left p-4 text-xs font-black uppercase text-red-800 tracking-wider">Post Title</th>
              <th className="text-left p-4 text-xs font-black uppercase text-red-800 tracking-wider">Deleted Date</th>
              <th className="text-right p-4 text-xs font-black uppercase text-red-800 tracking-wider">Recovery Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {deletedPosts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{post.title}</p>
                  <span className="text-xs text-slate-400 uppercase font-bold">{post.category}</span>
                </td>
                <td className="p-4 text-sm text-slate-500">
                  {new Date(post.deleted_at).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => handleRestore(post.id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 font-bold text-xs uppercase transition-colors"
                    >
                      <RotateCcw size={14} /> Restore
                    </button>
                    <button 
                        onClick={() => handlePermanentDelete(post.id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-bold text-xs uppercase transition-colors"
                    >
                      <Trash2 size={14} /> Destroy
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {deletedPosts.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-slate-300" size={32} />
            </div>
            <p className="font-medium">Trash is empty. Good job!</p>
          </div>
        )}
      </div>
    </div>
  );
}