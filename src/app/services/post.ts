import { computed, Injectable, signal } from '@angular/core';
import { Post } from '../models/post';
import { MOCK_POSTS } from '../mock/posts';
import { POST_STATUS } from '../constants/post-status';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSignal = signal<Post[]>(MOCK_POSTS);

  readonly featuredPost = computed(() => {
    return this.postsSignal().find((p) => p.isFeatured && p.status === POST_STATUS.PUBLISHED);
  });

  readonly regularPosts = computed(() => {
    return this.postsSignal().filter((p) => !p.isFeatured && p.status === POST_STATUS.PUBLISHED);
  });

  readonly allPosts = computed(() => this.postsSignal());

  getPostBySlug(slug: string): Post | undefined {
    return this.postsSignal().find((p) => p.slug === slug);
  }

  getPostsByTag(tag: string): Post[] {
    return this.postsSignal().filter(
      (p) => p.tags.includes(tag) && p.status === POST_STATUS.PUBLISHED,
    );
  }

  addPost(post: Post): void {
    this.postsSignal.update((posts) => [...posts, post]);
  }

  updatePost(updated: Post): void {
    this.postsSignal.update((posts) => posts.map((p) => (p.id === updated.id ? updated : p)));
  }

  searchPosts(query: string): Post[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return this.postsSignal().filter((p) => {
      if (p.status !== POST_STATUS.PUBLISHED) return false;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }
}
