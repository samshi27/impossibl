import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post';
import { PostCard } from '../../components/post-card/post-card';

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

  variants = ['red', 'green', 'blue', 'teal', 'magenta'] as const;
}
