'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useParams } from 'next/navigation'; 
import { ArrowLeft, Save, Loader2, UploadCloud, Globe, Lock, Bold, Italic, Quote, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams(); 
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  ));
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null); // New state for errors

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

  // 1. FETCH DATA ON LOAD
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Validation: Ensure ID exists
        if (!params?.id) return;

        console.log("Fetching post ID:", params.id); // Debugging Log

        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        
        if (data) {
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            category: data.category || 'politics',
            summary: data.summary || '',
            content: data.content || '',
            image_url: data.image_url || '',
            subtitle: data.subtitle || '',
            image_caption: data.image_caption || '',
            is_published: data.is_published || false
          });
        }
      } catch (error: unknown) {
        console.error('Full Error Object:', error); // Log the real object to Console
        const err = error as { message?: string };
        setFetchError(err.message ?? 'Could not load post. Check console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, supabase]);

  // 2. HANDLE IMAGE UPLOAD
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      setUploading(true);
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert('Error uploading image: ' + (err.message ?? String(error)));
    } finally {
      setUploading(false);
    }
  };

  // 3. HANDLE UPDATE
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: formData.title,
          slug: formData.slug,
          category: formData.category,
          summary: formData.summary,
          content: formData.content,
          image_url: formData.image_url,
          subtitle: formData.subtitle,
          image_caption: formData.image_caption,
          is_published: formData.is_published,
        })
        .eq('id', params.id);

      if (error) throw error;

      router.push('/admin/posts'); 
      router.refresh(); 
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert('Update Error: ' + (err.message ?? String(error)));
    } finally {
      setSaving(false);
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold"><Loader2 className="animate-spin mr-2" /> Loading Editor...</div>;

  // Error State UI
  if (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center pl-72">
        <div className="bg-red-50 p-6 rounded-2xl max-w-md">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Error Loading Post</h2>
            <p className="text-red-600 mb-6 font-mono text-sm">{fetchError}</p>
            <Link href="/admin/posts" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">
                Return to Posts
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans pl-72">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/admin/posts" className="flex items-center gap-2 text-slate-500 mb-8 font-bold text-xs uppercase hover:text-red-600 transition-colors">
          <ArrowLeft className="h-4 w-4"/> Back to Dashboard
        </Link>
        
        <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 space-y-6">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-black font-serif text-slate-900">Edit Post</h1>
              <p className="text-slate-500 text-sm mt-1">Updating: <span className="font-mono text-slate-400">{formData.slug}</span></p>
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

          {/* FIELDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="text-xs font-bold uppercase text-slate-500 block mb-2">Headline</label>
              <input id="title" type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded font-serif text-lg font-bold" />
            </div>
            <div>
              <label htmlFor="slug" className="text-xs font-bold uppercase text-slate-500 block mb-2">Slug</label>
              <input id="slug" type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full p-3 border rounded bg-slate-50 text-slate-600 font-mono text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="subtitle" className="text-xs font-bold uppercase text-slate-500 block mb-2">Subtitle</label>
            <input id="subtitle" type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-3 border rounded" />
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
               <label htmlFor="image_url" className="text-xs font-bold uppercase text-slate-500 block mb-2">Cover Image</label>
               <div className="flex gap-2 mb-2">
                 <input 
                    id="image_url"
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
             </div>
          </div>

          <div>
             <label htmlFor="summary" className="text-xs font-bold uppercase text-slate-500 block mb-2">Summary</label>
             <textarea id="summary" rows={3} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full p-3 border rounded" />
          </div>

          <div>
             <div className="flex justify-between items-end mb-2">
               <label htmlFor="editor" className="text-xs font-bold uppercase text-slate-500">Story Content</label>
               <div className="flex gap-2">
                 <button type="button" onClick={() => formatText('b')} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Bold className="h-4 w-4"/></button>
                 <button type="button" onClick={() => formatText('i')} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Italic className="h-4 w-4"/></button>
                 <button type="button" onClick={() => formatText('blockquote')} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Quote className="h-4 w-4"/></button>
               </div>
             </div>
             <textarea id="editor" rows={12} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-4 border rounded font-serif text-lg leading-relaxed" />
          </div>

          <button 
            type="submit" 
            disabled={saving} 
            className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}