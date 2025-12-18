'use client';
import { supabase } from '@/lib/supabase'; 

import { useState } from 'react';
import { Save, Image as ImageIcon, User, Calendar, X } from 'lucide-react';
import RichTextEditor from '../RichTextEditor';
import Image from 'next/image';

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    authorName: 'Capital News Desk',
    category: 'politics',
    excerpt: '',
    content: '',
    coverImage: '',
    imageCaption: '',
    imageCredit: '',
  });

 const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const title = e.target.value;
  
  // This turns "Mikenke Village Bombed!" into "mikenke-village-bombed"
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)/g, '');    // Remove leading/trailing hyphens

  setFormData({ ...formData, title, slug });
};

// ... inside your component

const [isUploading, setIsUploading] = useState(false);

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Only allow PNG, JPG, JPEG
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    alert("Please upload only PNG or JPG files.");
    return;
  }

  try {
    setIsUploading(true);
    
    // 1. Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // 2. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 3. Get the Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('article-images')
      .getPublicUrl(filePath);

    // 4. Update the form state with the REAL permanent link
    setFormData({ ...formData, coverImage: publicUrl });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Image upload failed!');
  } finally {
    setIsUploading(false);
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.coverImage) {
    alert("Please upload a featured image first.");
    return;
  }

  try {
    const { error } = await supabase
  .from('posts')
  .insert([{
    title: formData.title,
    slug: formData.slug, // Now sending the slug to the new column!
    category: formData.category,
    image_url: formData.coverImage,
    content: formData.content,
    summary: formData.excerpt,
    is_published: true,
  }]);

    if (error) throw error;

    alert("Story Published Successfully!");
    window.location.href = '/'; // Go home to see the result
  } catch (error) {
    console.error('Error saving article:', error);
    alert('Failed to publish story.');
  }
};

  const handleSaveDraft = () => {
  // In a real app, this would save to a 'drafts' table in Supabase
  console.log("Saving Draft...", formData);
  alert("Draft saved! (This is currently local state only)");
};


  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-slate-50 z-10 py-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black font-serif text-slate-900">Write New Story</h1>
        </div>
        <div className="flex gap-4">
            <button type="button" onClick={handleSaveDraft} className="px-6 py-3 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                Save Draft
            </button>
            <button type="submit" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg">
                <Save className="h-4 w-4" />
                Publish Story
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === LEFT COLUMN: MAIN EDITOR === */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Title Input */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           
            <input
              type="text"
              placeholder="Article Title"
              className="w-full text-3xl font-serif font-black text-slate-900 mb-3 focus:outline-none"
              value={formData.title}
              onChange={handleTitleChange}
              aria-label="Article title"
              title="Article title"
            />

           <input 
  type="file" 
  accept=".png, .jpg, .jpeg" 
  className="hidden" 
  disabled={isUploading}
  onChange={handleImageUpload} 
  aria-label="Upload featured image"
  title="Upload featured image"
/>

{isUploading && <p className="text-xs text-blue-600 mt-2 animate-pulse">Uploading to Cloud...</p>}

            <div className="px-4 text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span className="font-bold uppercase">Slug:</span>
                <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{formData.slug}</span>
            </div>
          </div>

          {/* RICH TEXT EDITOR */}
          <RichTextEditor 
            content={formData.content} 
            onChange={(html) => setFormData({...formData, content: html})}
          />

          {/* Excerpt */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Short Excerpt</h3>
            <textarea 
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              placeholder="A short summary that appears on the homepage cards..."
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-sm"
            ></textarea>
            <p className="text-right text-xs text-slate-400 mt-2">{formData.excerpt.length}/160 chars</p>
          </div>
        </div>

        {/* === RIGHT COLUMN: SETTINGS === */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Publishing Meta */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                Article Details
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="author" className="block text-xs font-bold text-slate-500 uppercase mb-1">Author</label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input 
                            id="author"
                            type="text" 
                            placeholder="Author name"
                            className="w-full pl-10 pr-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-red-600 text-sm font-medium"
                            value={formData.authorName}
                            onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="category" className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                    <select 
                        id="category"
                        className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-red-600 bg-white text-sm"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                        <option value="politics">Politics</option>
                        <option value="conflict">Human Rights</option>
                        <option value="human-rights">Tech</option>
                        <option value="business">Business</option>
                        <option value="tech">Conflict Monitor</option>
                        <option value="diplomacy">Diplomacy</option>
                        <option value="exclusive">Exclusive</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="publish-date" className="block text-xs font-bold text-slate-500 uppercase mb-1">Publish Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input 
                            id="publish-date"
                            type="text" 
                            disabled
                            className="w-full pl-10 pr-3 py-2 rounded border border-slate-200 bg-slate-50 text-slate-500 text-sm"
                            value={new Date().toLocaleDateString()}
                        />
                    </div>
                </div>
            </div>
          </div>

          {/* FILE UPLOAD SECTION */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                Featured Image
            </h3>

            <div className="space-y-4">
                {/* Visual Preview */}
                {formData.coverImage ? (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-200">
                    <Image 
                      src={formData.coverImage} 
                      alt="Preview" 
                      fill 
                      className="object-cover" 
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setFormData({...formData, coverImage: ''});
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-50 text-slate-600 hover:text-red-600"
                      aria-label="Remove featured image"
                      title="Remove featured image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  // Upload Box
                  <label className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-slate-400 hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer bg-slate-50">
                    <ImageIcon className="h-8 w-8 mb-2" />
                    <span className="text-sm font-bold">Click to Upload Image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                      aria-label="Upload featured image"
                      title="Upload featured image"
                    />
                  </label>
                )}

                {/* Caption */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Caption</label>
                    <textarea 
                        rows={2}
                        className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                        placeholder="Describe the image..."
                        value={formData.imageCaption}
                        onChange={(e) => setFormData({...formData, imageCaption: e.target.value})}
                    ></textarea>
                </div>

                {/* Credit */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Photo Credit</label>
                    <input 
                        type="text" 
                        className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
                        placeholder="e.g. AFP / Getty Images"
                        value={formData.imageCredit}
                        onChange={(e) => setFormData({...formData, imageCredit: e.target.value})}
                    />
                </div>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}