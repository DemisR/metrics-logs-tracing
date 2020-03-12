import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  retry,
  catchError
} from 'rxjs/operators';

import { captureMessage } from '@sentry/browser';
import * as Sentry from '@sentry/browser'

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          // Send error to Sentry
          captureMessage(errorMessage);
          // Open Collecting feedback
          // const eventId = Sentry.captureException(errorMessage  || error);
          // Sentry.showReportDialog({ eventId });
          return throwError(errorMessage);
        })
      );
  }
}
