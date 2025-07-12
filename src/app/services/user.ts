import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URLs from '../appConstants/api-urls';



// Base URL for backend API test endpoints

const SERVER_URL = environment.serverURL;

/**
 * Service to fetch data from different backend endpoints based on user roles.
 */
@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(private http : HttpClient) { }

 
  /**
   * Fetches public content. Accessible by anyone.
   * @returns An Observable of the HTTP response (string content).
   */
  getPublicContent(): Observable<any> {
    return this.http.get(SERVER_URL + API_URLs, { responseType: 'text' });
  }

  /**
   * Fetches user-specific content. Accessible by 'ROLE_USER' and 'ROLE_ADMIN'.
   * @returns An Observable of the HTTP response (string content).
   */
  getUserBoard(): Observable<any> {
    return this.http.get(SERVER_URL + API_URLs.USER.USER, { responseType: 'text' });
  }

  /**
   * Fetches admin-specific content. Accessible only by 'ROLE_ADMIN'.
   * @returns An Observable of the HTTP response (string content).
   */
  getAdminBoard(): Observable<any> {
    return this.http.get(SERVER_URL + API_URLs.ADMIN.ADMIN, { responseType: 'text' });
  }

  /**
   * Fetches super admin-specific content. Accessible only by 'ROLE_SUPERADMIN'.
   * @returns An Observable of the HTTP response (string content).
   */
  getSuperAdminBoard(): Observable<any> {
    return this.http.get(SERVER_URL + API_URLs.SUPER_ADMIN.SUPER_ADMIN, { responseType: 'text' });
  }

}
