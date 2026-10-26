import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost, IPostResponse } from './post.interface';

const POSTS_URL = 'https://dummyjson.com/posts';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  private http = inject(HttpClient);

  public getPosts(limit: number, skip: number): Observable<IPostResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip);

    return this.http.get<IPostResponse>(POSTS_URL, { params });
  }

  public getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${POSTS_URL}/${id}`);
  }

  public createPost(data: {
    title: string;
    body: string;
    tags: string[];
    views: number;
    userId: number;
    reactions: { likes: number; dislikes: number };
  }): Observable<IPost> {
    return this.http.post<IPost>(`${POSTS_URL}/add`, data);
  }

  public updatePost(id: number, changes: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(`${POSTS_URL}/${id}`, changes);
  }

  public deletePost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${POSTS_URL}/${id}`);
  }
}