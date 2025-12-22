'use client';

import { useState } from 'react';
// FIX 1: Use the function name compatible with your installed version
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Save, Loader2, Bold, Italic, Quote, Globe, Lock, Image as ImageIcon, UploadCloud } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostPage() {
  const router = useRouter();
  
  // FIX 1: Initialize the client using the older naming convention and provide required env vars
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
  );
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',          
    slug: '',           
    category: 'politics', 
    summary: '',        
    content: '',        
    image_url: '',      
    subtitle: '',       
    image_caption: '',  
    is_published: false 
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      setUploading(true);
      const file = e.target.files[0];
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
      
    // FIX 2: Type 'error' as unknown instead of any
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown upload error';
      alert('Error uploading image: ' + message);
    } finally {
      setUploading(false);
    }
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
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Session expired. Please log in again.");
      }

      const { error } = await supabase.from('posts').insert([{
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        summary: formData.summary,
        content: formData.content,
        image_url: formData.image_url,
        subtitle: formData.subtitle,
        image_caption: formData.image_caption,
        is_published: formData.is_published,
        author_id: user.id
      }]);

      if (error) throw error;

      router.push('/admin'); 
      router.refresh(); 
      
    // FIX 2: Type 'error' as unknown to satisfy TypeScript strict mode
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown database error';
      alert('Database Error: ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/admin" className="flex items-center gap-2 text-slate-500 mb-8 font-bold text-xs uppercase hover:text-red-600 transition-colors">
          <ArrowLeft className="h-4 w-4"/> Back to Dashboard
        </Link>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 space-y-6">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-black font-serif text-slate-900">Create Post</h1>
              <p className="text-slate-500 text-sm mt-1">New Article Entry</p>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setFormData({...formData, is_published: false})}
                className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${!formData.is_published ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Lock className="h-4 w-4" /> Draft
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, is_published: true})}
                className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${formData.is_published ? 'bg-emerald-100 text-emerald-700 shadow' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Globe className="h-4 w-4" /> Public
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Headline</label>
              <input type="text" required value={formData.title} onChange={handleTitleChange} className="w-full p-3 border rounded font-serif text-lg font-bold" placeholder="Main Title..." />
            </div>
            <div>
              <label htmlFor="slug" className="text-xs font-bold uppercase text-slate-500 block mb-2">Slug</label>
              <input id="slug" type="text" required value={formData.slug} readOnly className="w-full p-3 border rounded bg-slate-50 text-slate-400 font-mono text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Subtitle</label>
            <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-3 border rounded" placeholder="A short description..." />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div>
              <label htmlFor="category" className="text-xs font-bold uppercase text-slate-500 block mb-2">Category</label>
              <select 
                id="category"
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                className="w-full p-3 border rounded capitalize bg-white font-bold text-slate-900"
              >
                <option value="politics">Politics</option>
                <option value="diplomacy">Diplomacy</option>
                <option value="technology">Technology</option>
                <option value="human rights">Human Rights</option>
                <option value="business">Business</option>
                <option value="exclusive">Exclusive</option>
              </select>
             </div>
             
             <div>
               <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Cover Image</label>
               <div className="flex gap-2 mb-2">
                 <input 
                    type="text" 
                    value={formData.image_url} 
                    onChange={e => setFormData({...formData, image_url: e.target.value})} 
                    className="flex-1 p-3 border rounded text-sm text-slate-600" 
                    placeholder="https://..." 
                 />
                 <label className={`cursor-pointer bg-slate-900 text-white px-4 rounded flex items-center justify-center hover:bg-slate-800 transition-colors ${uploading ? 'opacity-50' : ''}`}>
                    {uploading ? <Loader2 className="animate-spin h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                 </label>
               </div>
               {formData.image_url && (
                 <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                   <ImageIcon className="h-3 w-3" /> Image linked successfully
                 </p>
               )}
             </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Image Caption</label>
            <input type="text" value={formData.image_caption} onChange={e => setFormData({...formData, image_caption: e.target.value})} className="w-full p-3 border rounded text-sm" placeholder="Photo credit..." />
          </div>

          <div>
             <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Summary</label>
             <textarea rows={3} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full p-3 border rounded" placeholder="Brief summary..." />
          </div>

          <div>
             <div className="flex justify-between items-end mb-2">
               <label className="text-xs font-bold uppercase text-slate-500">Story Content</label>
               <div className="flex gap-2">
                 <button type="button" onClick={() => formatText('b')} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Bold className="h-4 w-4"/></button>
                 <button type="button" onClick={() => formatText('i')} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Italic className="h-4 w-4"/></button>
                 <button type="button" onClick={() => formatText('blockquote')} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Quote className="h-4 w-4"/></button>
               </div>
             </div>
             <textarea id="editor" rows={12} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-4 border rounded font-serif text-lg leading-relaxed" placeholder="Write your story..." />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest transition-colors flex justify-center gap-2 text-white ${formData.is_published ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-600 hover:bg-slate-700'}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : formData.is_published ? <Send className="h-5 w-5" /> : <Save className="h-5 w-5" />} 
            {formData.is_published ? 'Publish Article' : 'Save Draft'}
          </button>

        </form>
      </div>
    </div>
  );
}