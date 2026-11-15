import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { APP_CONFIG } from '../app-config';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(APP_CONFIG);

  if (!config.enableLogs) {
    return next(req);
  }

  const startedAt = performance.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const duration = Math.round(performance.now() - startedAt);
          console.warn(
            `[HTTP] ${ req.method } ${ req.urlWithParams } → ${ event.status } ${ event.statusText } (${ duration }ms)`,
          );
        }
      },
      error: (error) => {
        const duration = Math.round(performance.now() - startedAt);
        console.warn(
          `[HTTP] ${ req.method } ${ req.urlWithParams } → ошибка ${ error.status ?? 'NETWORK' } (${ duration }ms)`,
        );
      },
    }),
  );
};
