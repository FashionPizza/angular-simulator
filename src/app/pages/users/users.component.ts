import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../../../enums/User';
import { UserService } from '../../user.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';
import { PluralPipe } from '../../pipes/plural.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserCardComponent, UserCreateComponent, UsersFilterComponent, PluralPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {

  private userService = inject(UserService);

  users$: Observable<IUser[]>;
  filteredUsers$: Observable<IUser[]>;

  private filterSubject = new BehaviorSubject<string>('');

  constructor() {
    this.users$ = this.userService.getUsers();

    this.filteredUsers$ = combineLatest([this.users$, this.filterSubject]).pipe(
      map(([users, filter]) =>
        filter ? users.filter((user) => user.name.toLowerCase().includes(filter)) : users,
      ),
    );
  }

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

  onDeleteUser(user: IUser): void {
    this.userService.deleteUser(user.id);
  }

  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
  }

  onFilterChange(filter: string): void {
    this.filterSubject.next(filter);
  }

}
