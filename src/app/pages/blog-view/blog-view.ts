import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PostService } from '../../services/post';
import { slugify } from '../../utils/slugify';
import { PostContent } from '../../components/post-content/post-content';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-view',
  imports: [PostContent, RouterLink],
  templateUrl: './blog-view.html',
  styleUrl: './blog-view.scss',
})
export class BlogView {
  private postService = inject(PostService);

  slug = input<string>();

  private postResource = rxResource({
    params: () => ({ slug: this.slug() }),
    stream: ({ params }) => this.postService.getPostBySlug(params.slug!),
  });

  post = this.postResource.value;
  isLoading = this.postResource.isLoading;
  error = this.postResource.error;

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
}
