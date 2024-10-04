import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private authfackservice: AuthfakeauthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this.authenticationService.authToken()
    const baseUrl = environment.baseUrl
    const checkURl = req.url.split('/')
    const newReq = authToken ? req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      url: checkURl.includes('api') ? baseUrl + req.url : req.url,
    }) : req.clone({
      url: checkURl.includes('api') ? baseUrl + req.url : req.url,
    })

    return next.handle(newReq)
  }
}
