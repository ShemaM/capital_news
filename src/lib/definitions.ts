export interface Author {
  name: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  imageCaption?: string; // Optional (?) because not every image needs one
  imageCredit?: string;  // e.g. "AFP / Getty Images"
  category: 'politics' | 'human-rights' | 'exclusive' | 'diplomacy' | 'business' | 'tech';
  author: Author;
  publishedAt: string;
}