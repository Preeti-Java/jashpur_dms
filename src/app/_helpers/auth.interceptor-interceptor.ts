import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage-service';
import { Injectable } from '@angular/core';



// Define the name of the HTTP header for authorization
const TOKEN_HEADER_KEY = 'Authorization';

/**
 * Interceptor to add JWT token to outgoing HTTP requests.
 * This ensures that authenticated requests include the necessary token for backend validation.
 */
@Injectable()
export class authInterceptorInterceptor implements HttpInterceptor{

  constructor(private token:TokenStorageService){
  }

  /**
   * Intercepts HTTP requests.
   * If a JWT token exists in localStorage, it clones the request and adds the token
   * to the Authorization header in 'Bearer' format.
   * @param req The outgoing HttpRequest.
   * @param next The next HttpHandler in the chain.
   * @returns An Observable of HttpEvents.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq =  req;
     const token= this.token.getToken()//Get token

     // If a token exists, clone the request and add the Authorization header
     if(token != null){
      authReq = req.clone({headers : req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
     }
    // Continue with the modified or original request
    return next.handle(authReq);
  }
 

};

  // Provider for the AuthInterceptor.
// This registers the interceptor to be used by Angular's HTTP client.
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: authInterceptorInterceptor, multi: true }
];
