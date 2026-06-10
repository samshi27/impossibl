import { Component, computed, inject, input } from '@angular/core';
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

  readonly tag = input<string>();
  readonly posts = computed(() => {
    const tag = this.tag();
    return tag ? this.postService.getPostsByTag(tag) : [];
  });
  variants = CARD_VARIANTS;
}
