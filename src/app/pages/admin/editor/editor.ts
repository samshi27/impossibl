import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { PostService } from '../../../services/post';
import { Router } from '@angular/router';
import { Post } from '../../../models/post';
import { slugify } from '../../../utils/slugify';
import { POST_STATUS, PostStatus } from '../../../constants/post-status';

@Component({
  selector: 'app-editor',
  imports: [MarkdownComponent, FormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  private postService = inject(PostService);
  private router = inject(Router);
  slug = input<string>();
  post = computed(() => {
    const s = this.slug();
    return s ? this.postService.getPostBySlug(s) : undefined;
  });
  isEditMode = computed(() => !!this.slug());

  title = linkedSignal(() => this.post()?.title ?? '');
  excerpt = linkedSignal(() => this.post()?.excerpt ?? '');
  author = linkedSignal(() => this.post()?.author ?? '');
  tags = linkedSignal(() => this.post()?.tags.join(', ') ?? '');
  body = linkedSignal(() => this.post()?.body ?? '');

  save() {
    this.savePost(POST_STATUS.DRAFT);
  }

  publish() {
    this.savePost(POST_STATUS.PUBLISHED);
  }

  private savePost(status: PostStatus) {
    const now = new Date().toISOString();
    const tags = this.tags()
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const existing = this.post();

    if (existing) {
      const updated: Post = {
        ...existing,
        title: this.title(),
        excerpt: this.excerpt(),
        author: this.author(),
        body: this.body(),
        tags,
        status,
        updatedAt: now,
        updatedBy: this.author(),
        publishedAt: existing.publishedAt ?? (status === POST_STATUS.PUBLISHED ? now : null),
      };

      this.postService.updatePost(updated);
    } else {
      const post: Post = {
        id: Date.now(),
        title: this.title(),
        slug: slugify(this.title()),
        body: this.body(),
        excerpt: this.excerpt(),
        author: this.author(),
        status,
        tags,
        isFeatured: false,
        viewCount: 0,
        createdAt: now,
        createdBy: this.author(),
        updatedAt: now,
        updatedBy: this.author(),
        publishedAt: status === POST_STATUS.PUBLISHED ? now : null,
      };
      this.postService.addPost(post);
    }

    this.router.navigate(['/']);
  }
}
