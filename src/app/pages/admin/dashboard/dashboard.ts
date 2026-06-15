import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../../services/post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private postService = inject(PostService);

  posts = this.postService.allPosts;
  isLoading = this.postService.allPostsLoading;
  error = this.postService.allPostsError;

  ngOnInit() {
    this.postService.activateAdmin();
  }
}
