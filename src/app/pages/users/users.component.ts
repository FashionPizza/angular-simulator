import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../enums/User';
import { UserService } from '../../user.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';
import { PluralPipe } from '../../pipes/plural.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserCardComponent, UserCreateComponent,
    UsersFilterComponent,PluralPipe ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  public filteredUsers$: Observable<User[]>;

  private filterSubject = new BehaviorSubject<string>('');

  public constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();

    this.filteredUsers$ = combineLatest([this.users$, this.filterSubject]).pipe(
      map(([users, filter]) =>
        filter
          ? users.filter(user => user.name.toLowerCase().includes(filter))
          : users
      )
    );
  }

  public ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

  public onDeleteUser(user: User): void {
    this.userService.deleteUser(user.id);
  }

  public onCreateUser(user: User): void {
    this.userService.addUser(user);
  }

  public onFilterChange(filter: string): void {
    this.filterSubject.next(filter);
  }
}