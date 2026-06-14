import { httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post, PostResponse } from '../models/post';
import { PostForm, PostRequest } from '../models/post-form';
import { fromApiStatus, toApiStatus } from '../utils/status-mapper';
import { environment } from '../../environments/environment';

// mappers
function toPost(api: PostResponse): Post {
  return { ...api, status: fromApiStatus(api.status) };
}

function toRequestBody(form: PostForm): PostRequest {
  return { ...form, status: toApiStatus(form.status) };
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private adminActive = signal(false);
  private publishedActive = signal(false);

  private publishedResource = httpResource<PostResponse[]>(() =>
    this.publishedActive() ? `${this.base}/posts` : undefined,
  );

  private allPostsResource = httpResource<PostResponse[]>(() =>
    this.adminActive() ? `${this.base}/admin/posts` : undefined,
  );

  private publishedPosts = computed(() => (this.publishedResource.value() ?? []).map(toPost));
  readonly featuredPost = computed(() => this.publishedPosts().find((p) => p.isFeatured));
  readonly regularPosts = computed(() => this.publishedPosts().filter((p) => !p.isFeatured));
  readonly allPosts = computed(() => (this.allPostsResource.value() ?? []).map(toPost));

  readonly isLoading = this.publishedResource.isLoading;
  readonly error = this.publishedResource.error;
  readonly allPostsLoading = this.allPostsResource.isLoading;
  readonly allPostsError = this.allPostsResource.error;

  // dashboard calls this to activate the admin fetch
  activateAdmin(): void {
    this.adminActive.set(true);
  }

  activatePublished(): void {
    this.publishedActive.set(true);
  }

  getPostBySlug(slug: string): Observable<Post> {
    return this.http.get<PostResponse>(`${this.base}/posts/${slug}`).pipe(map(toPost));
  }

  getAnyPostBySlug(slug: string): Observable<Post> {
    return this.http.get<PostResponse>(`${this.base}/admin/posts/${slug}`).pipe(map(toPost));
  }

  getPostsByTag(tag: string): Observable<Post[]> {
    return this.http
      .get<PostResponse[]>(`${this.base}/posts/tag/${tag}`)
      .pipe(map((posts) => posts.map(toPost)));
  }

  search(query: string): Post[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.publishedPosts().filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  createPost(form: PostForm): Observable<Post> {
    return this.http
      .post<PostResponse>(`${this.base}/admin/posts`, toRequestBody(form))
      .pipe(map(toPost));
  }

  updatePost(id: number, form: PostForm): Observable<Post> {
    return this.http
      .put<PostResponse>(`${this.base}/admin/posts/${id}`, toRequestBody(form))
      .pipe(map(toPost));
  }

  // cache refresh
  refresh(): void {
    this.publishedResource.reload();
    this.allPostsResource.reload();
  }
}
