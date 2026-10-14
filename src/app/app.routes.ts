import { Routes } from '@angular/router';

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
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Страница не найдена',
  },
];