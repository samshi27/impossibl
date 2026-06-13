import { PostStatus } from '../constants/post-status';

// what components work with (typed status)
export interface Post {
  id: number;
  title: string;
  slug: string;
  body: string;
  excerpt: string;
  author: string;
  status: PostStatus;
  viewCount: number;
  isFeatured: boolean;
  tags: string[];
  publishedAt: string | null;
}

// what the API sends back (status as raw string)
export type PostResponse = Omit<Post, 'status'> & { status: string };
