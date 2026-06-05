import { Component, computed, inject, input } from '@angular/core';
import { PostService } from '../../services/post';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { RouterLink } from '@angular/router';
import { Tags } from '../../components/tags/tags';
import { slugify } from '../../utils/slugify';
import { readTime } from '../../utils/read-time';

@Component({
  selector: 'app-blog-view',
  imports: [DatePipe, MarkdownComponent, RouterLink, Tags],
  templateUrl: './blog-view.html',
  styleUrl: './blog-view.scss',
})
export class BlogView {
  private postService = inject(PostService);

  // the input name (slug) must match the route param (/route/:slug)
  slug = input<string>();
  post = computed(() => {
    const s = this.slug();
    return s ? this.postService.getPostBySlug(s) : undefined;
  });

  headings = computed(() => {
    const body = this.post()?.body ?? '';
    return body
      .split('\n')
      .filter((line) => line.startsWith('## '))
      .map((line) => {
        const text = line.replace('## ', '').trim();
        const id = slugify(text);
        return { text, id };
      });
  });

  readTime = readTime;
}
