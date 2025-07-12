import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';
import { authInterceptorProviders } from './app/_helpers/auth.interceptor-interceptor';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(), // for Http interceptors
      withFetch()               // ✅ THIS is the required fix
    ),
    provideRouter(routes),
    authInterceptorProviders
  ]
}).catch(err => console.error(err));
