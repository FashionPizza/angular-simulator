import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { User } from '../enums/User';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersSubject = new BehaviorSubject<User[]>([]);

  public constructor(
    private userApiService: UserApiService,
    private loaderService: LoaderService,
    private messageService: MessageService,
  ) {}

  public setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  public getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  public loadUsers(): Observable<User[]> {
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
}