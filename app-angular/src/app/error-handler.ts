import * as Sentry from '@sentry/browser';
import { ErrorHandler, Injectable } from '@angular/core';

Sentry.init({
  dsn: "https://5db84de7027a4943ae96151889aef975@sentry.io/3128277"
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    // Open Collecting feedback
    Sentry.showReportDialog({ eventId });
    throw error;
  }
}
