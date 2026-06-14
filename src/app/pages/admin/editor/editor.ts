import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { PostService } from '../../../services/post';
import { Router } from '@angular/router';
import { POST_STATUS, PostStatus } from '../../../constants/post-status';
import { PostForm } from '../../../models/post-form';
import { EMPTY } from 'rxjs';
import { PostContentView } from '../../../models/post-content-view';
import { PostContent } from '../../../components/post-content/post-content';

@Component({
  selector: 'app-editor',
  imports: [FormsModule, PostContent],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  private postService = inject(PostService);
  private router = inject(Router);
  protected readonly STATUS = POST_STATUS;

  slug = input<string>();
  isEditMode = computed(() => !!this.slug());

  private postResource = rxResource({
    params: () => this.slug(),
    stream: ({ params: slug }) => {
      if (!slug) {
        return EMPTY;
      }

      return this.postService.getAnyPostBySlug(slug);
    },
  });

  private post = this.postResource.value;

  title = linkedSignal(() => this.post()?.title ?? '');
  excerpt = linkedSignal(() => this.post()?.excerpt ?? '');
  author = linkedSignal(() => this.post()?.author ?? '');
  tags = linkedSignal(() => this.post()?.tags.join(', ') ?? '');
  body = linkedSignal(() => this.post()?.body ?? '');

  attempted = signal<PostStatus | null>(null);
  saving = signal(false);
  saveError = signal<string | null>(null);

  titleValid = computed(() => this.title().trim().length > 0);
  excerptValid = computed(() => this.excerpt().trim().length > 0);
  authorValid = computed(() => this.author().trim().length > 0);
  bodyValid = computed(() => this.body().trim().length > 0);

  canSave = computed(() => this.titleValid());
  canPublish = computed(
    () => this.titleValid() && this.excerptValid() && this.authorValid() && this.bodyValid(),
  );

  previewPost = computed<PostContentView>(() => ({
    title: this.title() || 'Untitled',
    author: this.author() || 'Author',
    tags: this.tags()
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    body: this.body(),
    publishedAt: null, // not published in preview
  }));
  save() {
    this.attempted.set(POST_STATUS.DRAFT);
    if (!this.canSave()) return;
    this.savePost(POST_STATUS.DRAFT);
  }

  publish() {
    this.attempted.set(POST_STATUS.PUBLISHED);
    if (!this.canPublish()) return;
    this.savePost(POST_STATUS.PUBLISHED);
  }

  private savePost(status: PostStatus) {
    const form: PostForm = {
      title: this.title(),
      excerpt: this.excerpt(),
      author: this.author(),
      body: this.body(),
      status,
      tags: this.tags()
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    this.saving.set(true);
    this.saveError.set(null);

    const existing = this.post();
    const request$ = existing
      ? this.postService.updatePost(existing.id, form)
      : this.postService.createPost(form);

    request$.subscribe({
      next: () => {
        this.postService.refresh();
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.saving.set(false);
        const errorMessage =
          status === POST_STATUS.PUBLISHED
            ? 'Something went wrong while publishing.'
            : 'Something went wrong while saving.';

        this.saveError.set(err?.error?.detail ?? errorMessage);
      },
    });
  }
}
