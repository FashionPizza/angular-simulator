import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../enums/User';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http = inject(HttpClient);

  private readonly url = 'https://jsonplaceholder.typicode.com/users';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
