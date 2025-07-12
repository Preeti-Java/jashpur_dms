import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from '../_helpers/token-storage-service';
import { Observable } from 'rxjs/internal/Observable';

/**
 * AuthGuard: Protects routes that require a user to be logged in.
 * If the user is not logged in, it redirects them to the login page.
 */
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate{

  constructor(private tokenStorageService : TokenStorageService, private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    const user = this.tokenStorageService.getUser(); // Get user data from storage

    // If user data exists (meaning user is logged in), allow access
    if (user) {
      return true;
    }

     // If no user data, user is not logged in, so redirect to login page
     this.router.navigate(['/login']);
     return false;
  }

};
