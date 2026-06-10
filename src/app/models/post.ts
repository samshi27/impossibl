import { PostStatus } from '../constants/post-status';

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
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  publishedAt: string | null;
}
