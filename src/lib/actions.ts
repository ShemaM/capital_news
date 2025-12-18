'use server';

import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';

export async function likeArticle(articleId: number) {
  // In a real app, you'd also have user authentication
  // and track who liked what.
  // This is a simplified example.

  // Fetch current likes
  const { data, error } = await supabase
    .from('posts')
    .select('likes')
    .eq('id', articleId)
    .single();

  if (error) {
    console.error('Error fetching likes', error);
    return { error: 'Could not fetch likes' };
  }

  const newLikes = (data.likes || 0) + 1;

  const { error: updateError } = await supabase
    .from('posts')
    .update({ likes: newLikes })
    .eq('id', articleId);

  if (updateError) {
    console.error('Error updating likes', updateError);
    return { error: 'Could not update likes' };
  }

  revalidatePath('/'); // Revalidate home page and article page
  return { likes: newLikes };
}

interface Comment {
  id: number;
  created_at: string;
  content: string;
  author: string;
}

export async function addComment(articleId: number, comment: string, author: string): Promise<{ data?: Comment[] | null; error?: string | null; }> {
  if (!comment.trim()) {
    return { error: 'Comment cannot be empty' };
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([
      { post_id: articleId, content: comment, author: author || "Anonymous" },
    ])
    .select();

  if (error) {
    console.error('Error adding comment', error);
    return { error: 'Could not add comment' };
  }
  
  revalidatePath('/');
  return { data };
}

export async function getComments(articleId: number): Promise<{ data?: Comment[] | null; error?: string | null; }> {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', articleId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching comments', error);
        return { error: 'Could not fetch comments' };
    }

    return { data };
}
