import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client, // homepage fetches live data → client render
  },
  {
    path: 'blog/tag/:tag',
    renderMode: RenderMode.Client,
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/edit/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
