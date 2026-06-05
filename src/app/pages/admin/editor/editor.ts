import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { PostService } from '../../../services/post';
import { Router } from '@angular/router';
import { Post } from '../../../models/post';
import { slugify } from '../../../utils/slugify';

@Component({
  selector: 'app-editor',
  imports: [MarkdownComponent, FormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  private postService = inject(PostService);
  private router = inject(Router);

  title = signal('');
  excerpt = signal('');
  author = signal('');
  tags = signal('');
  body = signal('');

  save() {
    this.savePost('draft');
  }

  publish() {
    this.savePost('published');
  }

  private savePost(status: 'draft' | 'published') {
    const now = new Date().toISOString();
    const post: Post = {
      id: Date.now(),
      title: this.title(),
      slug: slugify(this.title()),
      body: this.body(),
      excerpt: this.excerpt(),
      author: this.author(),
      status,
      tags: this.tags()
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      isFeatured: false,
      viewCount: 0,
      createdAt: now,
      createdBy: this.author(),
      updatedAt: now,
      updatedBy: this.author(),
      publishedAt: status === 'published' ? now : null,
    };

    this.postService.addPost(post);
    this.router.navigate(['/']);
  }
}
