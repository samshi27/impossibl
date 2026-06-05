import { computed, Injectable, signal } from '@angular/core';
import { Post } from '../models/post';
import { MOCK_POSTS } from '../mock/posts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSignal = signal<Post[]>(MOCK_POSTS);

  readonly featuredPost = computed(() => {
    return this.postsSignal().find((p) => p.isFeatured && p.status === 'published');
  });

  readonly regularPosts = computed(() => {
    return this.postsSignal().filter((p) => !p.isFeatured && p.status === 'published');
  });

  readonly allPosts = computed(() => this.postsSignal());

  getPostBySlug(slug: string): Post | undefined {
    return this.postsSignal().find((p) => p.slug === slug);
  }

  getPostsByTag(tag: string): Post[] {
    return this.postsSignal().filter((p) => p.tags.includes(tag) && p.status === 'published');
  }

  addPost(post: Post): void {
    this.postsSignal.update((posts) => [...posts, post]);
  }
}
