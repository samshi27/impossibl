import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/admin/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Editor } from './pages/admin/editor/editor';
import { BlogView } from './pages/blog-view/blog-view';
import { TagView } from './pages/tag-view/tag-view';
import { Search } from './pages/search/search';
import { authGuard } from './guards/auth';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  // route order is important - blog/tag first
  // routes match top to bottom
  {
    path: 'blog/tag/:tag',
    component: TagView,
  },
  {
    path: 'blog/:slug',
    component: BlogView,
  },
  {
    path: 'search',
    component: Search,
  },
  {
    path: 'admin/login',
    component: Login,
  },
  {
    path: 'admin',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'admin/create',
    component: Editor,
    canActivate: [authGuard],
  },
  {
    path: 'admin/edit/:slug',
    component: Editor,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: Home,
  },
];
