import { PostStatus } from '../constants/post-status';

// what the editor form produces (typed status)
export interface PostForm {
  title: string;
  excerpt: string;
  body: string;
  author: string;
  status: PostStatus;
  tags: string[];
}

// what the API accepts (status as raw string)
export type PostRequest = Omit<PostForm, 'status'> & { status: string };
