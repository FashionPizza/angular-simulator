// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Главная' },
  { path: 'users', component: UsersComponent, title: 'Пользователи' },
  { path: '**', component: NotFoundComponent, title: 'Страница не найдена' },
];