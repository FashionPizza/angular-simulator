import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { LoaderService } from '../../loader.service';
import { MessageService } from '../../message.service';
import { IPost } from './post.interface';
import { PostApiService } from './post-api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsSubject = new BehaviorSubject<IPost[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  private loadedLimit = -1;
  private loadedSkip = -1;

  private postApiService = inject(PostApiService);
  private loaderService = inject(LoaderService);
  private messageService = inject(MessageService);

  public getPosts(): Observable<IPost[]> {
    return this.postsSubject.asObservable();
  }

  public getTotal(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  public loadPosts(limit: number, skip: number): Observable<IPost[]> {
    if (limit === this.loadedLimit && skip === this.loadedSkip) {
      return of(this.postsSubject.value);
    }

    return this.postApiService.getPosts(limit, skip).pipe(
      tap((response) => {
        this.totalSubject.next(response.total);
        this.loadedLimit = limit;
        this.loadedSkip = skip;
        this.postsSubject.next(response.posts);
      }),
      map((response) => response.posts),
      catchError(() => {
        this.messageService.showError('Не удалось загрузить посты');
        return of<IPost[]>([]);
      })
    );
  }

  public getLastQuery(): { limit: number; skip: number } {
    return { limit: this.loadedLimit, skip: this.loadedSkip };
  }

  public addPost(data: {
    title: string;
    body: string;
    tags: string[];
    views: number;
  }): Observable<IPost | null> {
    this.loaderService.showLoader();
    const payload = {
      title: data.title,
      body: data.body,
      tags: data.tags,
      views: data.views,
      userId: 1,
      reactions: { likes: 0, dislikes: 0 },
    };
    return this.postApiService.createPost(payload).pipe(
      tap((created) => {
        const exists = this.postsSubject.value.some((p) => p.id === created.id);
        const id = exists
          ? Math.max(...this.postsSubject.value.map((p) => p.id)) + 1
          : created.id;

        const createdPost: IPost = {
          id,
          title: created.title ?? payload.title,
          body: created.body ?? payload.body,
          tags: created.tags ?? payload.tags,
          views: created.views ?? payload.views,
          reactions: created.reactions ?? payload.reactions,
          userId: payload.userId,
        };

        this.postsSubject.next([createdPost, ...this.postsSubject.value]);
        this.messageService.showSuccess('Пост создан');
      }),
      catchError(() => {
        this.messageService.showError('Не удалось создать пост');
        return of(null);
      }),
      finalize(() => this.loaderService.hideLoader())
    );
  }

  public updatePost(post: IPost): Observable<IPost | null> {
    this.loaderService.showLoader();
    return this.postApiService.updatePost(post.id, {
      title: post.title,
      body: post.body,
      tags: post.tags,
      views: post.views,
    }).pipe(
      tap(() => this.applyLocalUpdate(post)),
      catchError((error) => {
        if (error?.status === 404 && this.getPostByIdLocal(post.id)) {
          this.applyLocalUpdate(post);
          return of(post);
        }
        this.messageService.showError('Не удалось обновить пост');
        return of(null);
      }),
      finalize(() => this.loaderService.hideLoader())
    );
  }

  public deletePost(id: number): Observable<IPost | null> {
    this.loaderService.showLoader();
    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        this.postsSubject.next(this.postsSubject.value.filter((p) => p.id !== id));
        this.messageService.showSuccess('Пост удалён');
      }),
      catchError((error) => {
        if (error?.status === 404 && this.getPostByIdLocal(id)) {
          this.postsSubject.next(this.postsSubject.value.filter((p) => p.id !== id));
          this.messageService.showSuccess('Пост удалён');
          return of(null);
        }
        this.messageService.showError('Не удалось удалить пост');
        return of(null);
      }),
      finalize(() => this.loaderService.hideLoader())
    );
  }

  public getPostByIdLocal(id: number): IPost | undefined {
    return this.postsSubject.value.find((p) => p.id === id);
  }

  private applyLocalUpdate(post: IPost): void {
    this.postsSubject.next(
      this.postsSubject.value.map((p) => p.id === post.id ? { ...p, ...post } : p)
    );
    this.messageService.showSuccess('Пост обновлён');
  }
}