import * as Sentry from '@sentry/browser';
import {
  ErrorHandler,
  Injectable,
  Injector
} from '@angular/core';
import {
  HttpErrorResponse
} from '@angular/common/http';

Sentry.init({
  dsn: 'https://5db84de7027a4943ae96151889aef975@sentry.io/3128277'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error: any) {
    const eventId = Sentry.captureException(error.originalError || error);
    if (Error instanceof HttpErrorResponse) {
      console.log(error.status);
    } else {
      console.error('an error occured here broo');
      Sentry.showReportDialog({ eventId });
    }
  }
}
