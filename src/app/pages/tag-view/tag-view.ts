import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { PostService } from '../../services/post';
import { PostCard } from '../../components/post-card/post-card';
import { CARD_VARIANTS } from '../../constants/card-variants';

@Component({
  selector: 'app-tag-view',
  imports: [PostCard],
  templateUrl: './tag-view.html',
  styleUrl: './tag-view.scss',
})
export class TagView {
  private postService = inject(PostService);

  readonly tag = input.required<string>();

  private readonly postsResource = rxResource({
    params: () => ({ tag: this.tag() }),
    stream: ({ params }) => this.postService.getPostsByTag(params.tag),
  });

  readonly posts = computed(() => this.postsResource.value() ?? []);
  readonly isLoading = this.postsResource.isLoading;
  readonly error = this.postsResource.error;
  readonly variants = CARD_VARIANTS;
}
