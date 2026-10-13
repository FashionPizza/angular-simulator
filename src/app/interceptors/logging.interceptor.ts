import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startedAt = performance.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const duration = Math.round(performance.now() - startedAt);
          console.log(
            `[HTTP] ${req.method} ${req.urlWithParams} → ${event.status} ${event.statusText} (${duration}ms)`
          );
        }
      },
      error: (error) => {
        const duration = Math.round(performance.now() - startedAt);
        console.log(
          `[HTTP] ${req.method} ${req.urlWithParams} → ошибка ${error.status ?? 'NETWORK'} (${duration}ms)`
        );
      },
    })
  );
};