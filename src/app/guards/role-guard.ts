import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from '../_helpers/token-storage-service';
import { Observable } from 'rxjs/internal/Observable';

/**
 * RoleGuard: Protects routes that require a user to have a specific role.
 * If the user does not have the required role, it redirects them to an unauthorized page (or home).
 */
@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate{

  constructor(private tokenStorageService : TokenStorageService, private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
   
    const expectedRole = route.data['role'];// Get the required role from route data
    const user = this.tokenStorageService.getUser(); //Get current user data

    if(user && user.roles){
      // Check if the user's roles include the expected role
      if(user.roles.includes(expectedRole)){
        return true; // User has the required role, allow access
      }
      else{
        // User does not have the required role, redirect to home
        this.router.navigate(['/home']);
        return false;
      }
    }

    // If no user or roles, redirect to login (or home, based on your app's logic)
    this.router.navigate(['/login']);
    return false;

  }

};
