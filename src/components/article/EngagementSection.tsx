'use client';

import { useState } from 'react';
import { Heart, MessageSquare, Share2, Send } from 'lucide-react';

export function EngagementSection() {
  const [likes, setLikes] = useState(124);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { user: 'Alex M.', text: 'Great reporting on this critical issue.', date: '2 hours ago' },
    { user: 'Sarah J.', text: 'We need more coverage like this.', date: '5 hours ago' }
  ]);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([{ user: 'You', text: comment, date: 'Just now' }, ...comments]);
    setComment('');
  };

  return (
    <section className="my-12 border-t border-slate-200 pt-8">
      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            isLiked ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span className="font-bold">{likes} Likes</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
          <Share2 className="h-5 w-5" />
          <span className="font-bold">Share</span>
        </button>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl">
        <h3 className="flex items-center gap-2 text-xl font-bold font-serif mb-6">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments.length})
        </h3>
        <form onSubmit={handleCommentSubmit} className="mb-8 flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Join the discussion..."
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200"
          />
          <button
            type="submit"
            className="bg-slate-900 text-white px-6 rounded-lg font-medium"
            aria-label="Post comment"
            title="Post comment"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
        <div className="space-y-6">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0">
                {c.user[0]}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{c.user} <span className="text-slate-400 font-normal">• {c.date}</span></p>
                <p className="text-slate-700 text-sm">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}