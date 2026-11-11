import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IUser } from '../enums/User';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

const USERS_STORAGE_KEY = 'users';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService = inject(UserApiService);
  private loaderService = inject(LoaderService);
  private messageService = inject(MessageService);
  private localStorageService = inject(LocalStorageService);

  private usersSubject = new BehaviorSubject<IUser[]>([]);

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.set(USERS_STORAGE_KEY, users);
  }

  getUsers(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  loadUsers(): Observable<IUser[]> {
    const storedUsers = this.localStorageService.get<IUser[]>(USERS_STORAGE_KEY);

    if (storedUsers && storedUsers.length > 0) {
      this.usersSubject.next(storedUsers);
      return of(storedUsers);
    }

    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      tap((users) => this.setUsers(users)),
      catchError(() => {
        this.messageService.showError('Не удалось загрузить список пользователей');
        this.setUsers([]);
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  deleteUser(userId: number): void {
    const updatedUsers = this.usersSubject.value.filter((user) => user.id !== userId);
    this.setUsers(updatedUsers);
    this.messageService.showSuccess('Пользователь удалён');
  }

  addUser(user: IUser): void {
    const updatedUsers = [...this.usersSubject.value, user];
    this.setUsers(updatedUsers);
    this.messageService.showSuccess('Пользователь создан');
  }

}
