import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../../enums/User';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;

  public constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }

  public ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }
}