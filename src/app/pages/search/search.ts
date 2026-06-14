import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post';
import { PostCard } from '../../components/post-card/post-card';
import { CARD_VARIANTS } from '../../constants/card-variants';

@Component({
  selector: 'app-search',
  imports: [FormsModule, PostCard],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private postService = inject(PostService);

  searchTerm = signal('');
  submittedTerm = signal('');

  results = computed(() => this.postService.search(this.submittedTerm()));

  variants = CARD_VARIANTS;

  ngOnInit() {
    this.postService.activatePublished();
  }

  search() {
    this.submittedTerm.set(this.searchTerm().trim());
  }
}
