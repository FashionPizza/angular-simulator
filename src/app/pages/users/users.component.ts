import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  public users: User[] = [
    { id: 1, name: 'Petr Petrov', email: 'petrpetrov@domain.com', role: 'Гид' },
    { id: 2, name: 'John Ivanov', email: 'johnivanov@domain.com', role: 'Инструктор' },
    { id: 3, name: 'Bob Baranov', email: 'baranovbob@domain.com', role: 'Менеджер' },
  ];
}