import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { CommonError } from './common-error';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class CommonHttpErrorService {
  constructor(
    private toastrService: ToastrService,
  ) {}

  handleError(httpErrorResponse: HttpErrorResponse): Observable<any> {

    this.toastrService.error(httpErrorResponse?.error?.message || "Unauthorized")

    return throwError(httpErrorResponse);
  }
}
