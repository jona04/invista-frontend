import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Emitters } from '../emitters/emitters';

/** Endpoints reachable while logged out, which must never trigger a redirect. */
const PUBLIC_PATHS = ['/login'];

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  /**
   * Send credentials on every request and return the user to the login screen
   * whenever the API rejects the session.
   *
   * The redirect lives here, and not only in the secure layout, because the
   * session can end at any moment — including while a screen is already open.
   * Handling it centrally covers every call instead of only the one issued on
   * layout init.
   *
   * @param request The outgoing request.
   * @param next The next handler in the chain.
   * @returns The response stream, with unauthenticated failures rerouted.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      withCredentials: true
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.isSessionRejected(error) && !this.isPublic(request.url)) {
          Emitters.authEmitter.emit(undefined);
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }

  /**
   * Tell whether a failure means the session is gone.
   *
   * The API answers 403 rather than 401 for an absent or revoked token, so
   * both statuses have to count.
   *
   * @param error The failure returned by the API.
   * @returns True when the user should be sent back to the login screen.
   */
  private isSessionRejected(error: HttpErrorResponse): boolean {
    return error.status === 401 || error.status === 403;
  }

  /**
   * Tell whether a URL belongs to an endpoint reachable while logged out.
   *
   * Redirecting on a failed login would swap the error message for a page
   * reload, hiding from the user that the password was simply wrong.
   *
   * @param url The requested URL.
   * @returns True when a failure on this URL must not redirect.
   */
  private isPublic(url: string): boolean {
    return PUBLIC_PATHS.some(path => url.endsWith(path));
  }
}
