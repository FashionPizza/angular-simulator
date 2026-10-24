import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../../loader.service';
import { MessageService } from '../../message.service';
import { IPost } from './post.interface';
import { PostApiService } from './post-api.service';
import { PostService } from './post.service';

export const postResolver: ResolveFn<IPost | null> = (route) => {
  const postApiService = inject(PostApiService);
  const postService = inject(PostService);
  const loaderService = inject(LoaderService);
  const messageService = inject(MessageService);
  const router = inject(Router);

  const id = Number(route.paramMap.get('id'));

  const localPost = postService.getPostByIdLocal(id);
  if (localPost) {
    return of(localPost);
  }

  loaderService.showLoader();

  return postApiService.getPostById(id).pipe(
    catchError(() => {
      messageService.showError('Не удалось загрузить пост');
      router.navigate(['/posts']);
      return of(null);
    }),
    finalize(() => loaderService.hideLoader())
  );
};