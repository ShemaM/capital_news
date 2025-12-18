export interface Author {
  name: string;
  avatar?: string;
}

export interface SupabaseArticle {
  id: number | string;
  title: string;
  summary: string;
  category: string;
  slug: string;
  image_url: string | null;
  author_name: string | null;
  created_at: string;
  is_published: boolean;
  deleted_at: string | null;
  content?: string;
  image_caption?: string;
  image_credit?: string;
  likes?: number;
}