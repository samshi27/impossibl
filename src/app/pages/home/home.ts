import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post';
import { PostCard } from '../../components/post-card/post-card';
import { CARD_VARIANTS } from '../../constants/card_variant';

@Component({
  selector: 'app-home',
  imports: [PostCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private postService = inject(PostService);

  featuredPost = this.postService.featuredPost;
  regularPosts = this.postService.regularPosts;

  variants = CARD_VARIANTS;
}
