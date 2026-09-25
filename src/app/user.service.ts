import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { User } from '../enums/User';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

const USERS_STORAGE_KEY = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersSubject = new BehaviorSubject<User[]>([]);

  public constructor(
    private userApiService: UserApiService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
  ) {}

  public setUsers(users: User[]): void {
    this.usersSubject.next(users);
    this.localStorageService.set(USERS_STORAGE_KEY, users);
  }

  public getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  public loadUsers(): Observable<User[]> {
    const storedUsers = this.localStorageService.get<User[]>(USERS_STORAGE_KEY);

    if (storedUsers && storedUsers.length > 0) {
      this.usersSubject.next(storedUsers);
      return of(storedUsers);
    }

    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      tap(users => this.setUsers(users)),
      catchError(() => {
        this.messageService.showError('Не удалось загрузить список пользователей');
        this.setUsers([]);
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader())
    );
  }

  public deleteUser(userId: number): void {
    const updatedUsers = this.usersSubject.value.filter(user => user.id !== userId);
    this.setUsers(updatedUsers);
    this.messageService.showSuccess('Пользователь удалён');
  }

  public addUser(user: User): void {
    const updatedUsers = [...this.usersSubject.value, user];
    this.setUsers(updatedUsers);
    this.messageService.showSuccess('Пользователь создан');
  }
}