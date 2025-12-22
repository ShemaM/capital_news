// components/article/CommentSection.tsx - FIXED
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Send, User, Calendar, MessageSquare, Loader2 } from 'lucide-react';

interface Profile {
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
}

interface Comment {
  id: string;
  content: string;
  user_id: string;
  post_id: number;
  created_at: string;
  profiles: Profile | null; // This comes from the join
}

interface CommentSectionProps {
  articleId: string;
  initialComments?: Comment[];
  commentsEnabled: boolean;
}

export default function CommentSection({ 
  articleId, 
  initialComments = [],
  commentsEnabled 
}: CommentSectionProps) {
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '', 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  ));
  
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  // Load user session
  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    
    loadUser();
  }, [supabase]);

  // Submit new comment - FIXED
  // In handleSubmitComment function, add more debugging:
const handleSubmitComment = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!newComment.trim()) {
    alert('Please enter a comment');
    return;
  }
  
  if (!user) {
    alert('Please sign in to comment');
    return;
  }
  
  setSubmitting(true);
  
  try {
    console.log('User ID:', user.id);
    console.log('Post ID:', parseInt(articleId));
    
    // Insert the comment
    const commentData = {
      content: newComment.trim(),
      user_id: user.id,
      post_id: parseInt(articleId),
    };
    
    console.log('Inserting comment:', commentData);
    
    const { data: newCommentData, error } = await supabase
      .from('comments')
      .insert(commentData)
      .select(`
        *,
        profiles (
          full_name,
          username,
          avatar_url
        )
      `)
      .single();
    
    if (error) {
      console.error('Comment insert error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }
    
    // Add to local state
    setComments(prev => [newCommentData, ...prev]);
    setNewComment('');
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Full error submitting comment:', error);
    alert(`Failed to post comment: ${error.message}\n\nCheck console for details.`);
  } finally {
    setSubmitting(false);
  }
};

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get author name from comment with profile
  const getAuthorName = (comment: Comment) => {
    if (comment.profiles) {
      return comment.profiles.full_name || comment.profiles.username || 'Anonymous';
    }
    return 'Anonymous';
  };

  // Get author initial
  const getAuthorInitial = (comment: Comment) => {
    const name = getAuthorName(comment);
    return name[0]?.toUpperCase() || 'A';
  };

  // If comments are disabled
  if (!commentsEnabled) {
    return (
      <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 text-center">
        <MessageSquare className="h-12 w-12 mx-auto text-slate-400 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Comments Disabled</h3>
        <p className="text-slate-600">
          Commenting is currently disabled. Administrators can enable comments in the settings panel.
        </p>
      </div>
    );
  }

  return (
    <div className="comments-section">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold text-slate-900">
            Comments <span className="text-slate-500">({comments.length})</span>
          </h2>
        </div>
      </div>
      
      {/* Add Comment Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Leave a Comment</h3>
        
        {user ? (
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts on this article?..."
              className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none font-sans"
              disabled={submitting}
              required
              maxLength={1000}
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-slate-500 flex items-center gap-2">
                <User size={14} />
                <span>
                  Commenting as <strong className="text-slate-900">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous'}
                  </strong>
                </span>
              </div>
              
              <button
                type="submit"
                disabled={!newComment.trim() || submitting}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Post Comment
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-slate-600 mb-4">Please sign in to leave a comment.</p>
            <button
              onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition"
            >
              Sign In to Comment
            </button>
          </div>
        )}
      </div>
      
      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
          <MessageSquare className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Comments Yet</h3>
          <p className="text-slate-600">
            Be the first to share your thoughts on this article!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                    {getAuthorInitial(comment)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {getAuthorName(comment)}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={12} />
                      <span>{formatDate(comment.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                {user?.id === comment.user_id && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-bold">
                    You
                  </span>
                )}
              </div>
              
              <p className="text-slate-700 whitespace-pre-wrap font-sans">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}