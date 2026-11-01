import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
import { postResolver } from './features/posts/post.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
    title: 'Вход',
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Главная',
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent),
    title: 'Пользователи',
  },
  {
    path: 'posts/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/posts/post-create.component').then((m) => m.PostCreateComponent),
    title: 'Создать пост',
  },
  {
    path: 'posts',
    canActivate: [authGuard],
    loadComponent: () => import('./features/posts/posts.component').then((m) => m.PostsComponent),
    title: 'Посты',
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/posts/post-detail.component').then((m) => m.PostDetailComponent),
    resolve: { post: postResolver },
    title: 'Пост',
  },
  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Страница не найдена',
  },
];