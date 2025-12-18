'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Bold, Italic, Quote } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'politics', 
    excerpt: '',
    content: '',
    coverImage: '',
    authorName: 'Capital News Desk',
  });

  // Auto-generate Slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const formatText = (tag: string) => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const selected = value.substring(selectionStart, selectionEnd);
    const newText = value.substring(0, selectionStart) + `<${tag}>${selected}</${tag}>` + value.substring(selectionEnd);
    setFormData({ ...formData, content: newText });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('posts').insert([{
      title: formData.title,
      slug: formData.slug,
      category: formData.category,
      summary: formData.excerpt,
      content: formData.content,
      image_url: formData.coverImage,
      author_name: formData.authorName,
      is_published: true,
    }]);

    if (!error) router.push('/admin/posts');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/admin/posts" className="flex items-center gap-2 text-slate-500 mb-8 font-bold text-xs uppercase">
          <ArrowLeft className="h-4 w-4"/> Dashboard
        </Link>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-black font-serif text-emerald-900">Newsroom Editor v2.0</h1>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold uppercase">Great Lakes Edition</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Headline</label>
              <input type="text" required value={formData.title} onChange={handleTitleChange} className="w-full p-3 border rounded font-serif text-lg font-bold" placeholder="Article Title..." />
            </div>
            <div>
              <label htmlFor="slug" className="text-xs font-bold uppercase text-slate-500 block mb-2">Slug (Auto)</label>
              <input id="slug" type="text" required value={formData.slug} readOnly className="w-full p-3 border rounded bg-slate-100 text-slate-500 font-mono text-sm" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div>
              <label htmlFor="category" className="text-xs font-bold uppercase text-slate-500 block mb-2">Category Selection</label>
              <select 
                id="category" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                className="w-full p-3 border rounded capitalize bg-white font-bold text-slate-900"
              >
                {/* HARD-CODED OPTIONS TO OVERRIDE CACHE */}
                <option value="politics">Politics</option>
                <option value="diplomacy">Diplomacy</option>
                <option value="technology">Technology</option>
                <option value="human rights">Human Rights</option>
                <option value="business">Business</option>
                <option value="exclusives">Exclusives</option>
              </select>
             </div>
             <div>
               <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Cover Image URL</label>
               <input type="text" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} className="w-full p-3 border rounded" placeholder="https://..." />
             </div>
          </div>

          <div>
             <div className="flex justify-between items-end mb-2">
               <label className="text-xs font-bold uppercase text-slate-500">Story Content</label>
               <div className="flex gap-2">
                 <button type="button" onClick={() => formatText('b')} className="p-1 bg-slate-100 rounded hover:bg-slate-200" aria-label="Bold" title="Bold">
                   <Bold className="h-4 w-4" aria-hidden="true"/>
                 </button>
                 <button type="button" onClick={() => formatText('i')} className="p-1 bg-slate-100 rounded hover:bg-slate-200" aria-label="Italic" title="Italic">
                   <Italic className="h-4 w-4" aria-hidden="true"/>
                 </button>
                 <button type="button" onClick={() => formatText('blockquote')} className="p-1 bg-slate-100 rounded hover:bg-slate-200" aria-label="Blockquote" title="Blockquote">
                   <Quote className="h-4 w-4" aria-hidden="true"/>
                 </button>
               </div>
             </div>
             <textarea id="editor" rows={12} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-4 border rounded font-serif text-lg leading-relaxed" placeholder="Write your story..." />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-900 text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-emerald-800 transition-colors flex justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : <Save className="h-5 w-5" />} Save To Database
          </button>
        </form>
      </div>
    </div>
  );
}