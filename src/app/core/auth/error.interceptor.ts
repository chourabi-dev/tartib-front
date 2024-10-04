import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { EmptyError, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CommonHttpErrorService } from '../handlers/error-handler/common-http-error.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

/**
 * Intercept
*
 * @param req
 * @param next
*/
export const errorInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const commonHttpErrorService = inject(CommonHttpErrorService)
  const auth = inject(AuthService)

  return next(req).pipe(
    catchError((error) => {
      return throwError(() => {
        commonHttpErrorService.handleError(error)
        if(error.status === 401) {
            auth.signOut()
            location.reload()
        }
        return new Error(error)
      });
    })
  )
}
