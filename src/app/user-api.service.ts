import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../enums/User';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly url = 'https://jsonplaceholder.typicode.com/users';

  public constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}