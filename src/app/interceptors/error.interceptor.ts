import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      const status = error?.status;

      if (status >= 500 && status < 600) {
        messageService.showError(`Ошибка сервера (${status}). Попробуйте позже.`);
      }

      return throwError(() => error);
    })
  );
};