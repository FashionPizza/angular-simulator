import { Routes } from '@angular/router';
import { postResolver } from './features/posts/post.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Главная',
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent),
    title: 'Пользователи',
  },
  {
    path: 'posts/create',
    loadComponent: () => import('./features/posts/post-create.component').then((m) => m.PostCreateComponent),
    title: 'Создать пост',
  },
  {
    path: 'posts',
    loadComponent: () => import('./features/posts/posts.component').then((m) => m.PostsComponent),
    title: 'Посты',
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./features/posts/post-detail.component').then((m) => m.PostDetailComponent),
    resolve: { post: postResolver },
    title: 'Пост',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Страница не найдена',
  },
];