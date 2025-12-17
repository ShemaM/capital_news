'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2, Eye, Search, Filter, Plus } from 'lucide-react';
import { latestArticles } from '@/lib/placeholder-data'; // Using mock data for now

export default function AllPostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Filter logic
  const filteredPosts = latestArticles.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      alert(`Deleted article ${id} (Mock Action)`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black font-serif text-slate-900">All Posts</h1>
          <p className="text-slate-500 text-sm">Manage, edit, or delete your articles.</p>
        </div>
        <Link 
          href="/admin/create"
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-600 transition-colors shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Write New Story
        </Link>
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full md:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <select 
            aria-label="Filter by category"
            title="Filter by category"
            className="w-full pl-10 pr-8 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 text-sm bg-white appearance-none cursor-pointer"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="politics">Politics</option>
            <option value="business">Business</option>
            <option value="tech">Tech</option>
            <option value="conflict">Conflict</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Article</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                  
                  {/* Title & Image */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-16 bg-slate-200 rounded overflow-hidden shrink-0">
                         {post.coverImage && (
                           <Image src={post.coverImage} alt="" fill className="object-cover" />
                         )}
                      </div>
                      <span className="font-bold text-slate-900 line-clamp-1 max-w-xs font-serif">
                        {post.title}
                      </span>
                    </div>
                  </td>

                  {/* Category Badge */}
                  <td className="px-6 py-4">
                    <span className={`
                      px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                      ${post.category === 'politics' ? 'bg-red-50 text-red-600 border-red-100' : 
                        post.category === 'business' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        post.category === 'tech' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        'bg-slate-100 text-slate-600 border-slate-200'}
                    `}>
                      {post.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {post.author.name}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/${post.category}/${post.slug}`} 
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                        title="View Live"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button 
                        className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Edit"
                        onClick={() => alert("Edit mode coming soon with Supabase!")}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <p>No articles found matching your filters.</p>
                  <button onClick={() => {setSearchQuery(''); setFilterCategory('all')}} className="text-red-600 font-bold text-sm mt-2 hover:underline">
                    Clear Filters
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}