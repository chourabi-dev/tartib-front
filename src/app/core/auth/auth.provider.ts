import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { authInterceptor } from 'app/core/auth/auth.interceptor';
import { AuthService } from 'app/core/auth/auth.service';
import { errorInterceptor } from './error.interceptor';

export const provideAuth = (): Array<Provider | EnvironmentProviders> => {
  return [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    {
      provide: [ENVIRONMENT_INITIALIZER, HTTP_INTERCEPTORS],
      useValue: () => inject(AuthService),
      multi: true,
    },
  ];
};
