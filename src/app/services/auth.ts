import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import API_URLs from '../appConstants/api-urls';


// Define HTTP headers for content type (JSON)
const SERVER_URL = environment.serverURL;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Service to handle user authentication (login and registration).
 * It communicates with the Spring Boot backend's authentication API.
 */
@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient) { }

   /**
   * Sends a login request to the backend.
   * @param username The user's username.
   * @param password The user's password.
   * @returns An Observable of the HTTP response.
   */
  login(username : String , password : String) : Observable<any>{
    console.log("--------");
    return this.http.post(SERVER_URL + API_URLs.CORE.LOGIN , {
      username,
      password
    },httpOptions);
  }

   /**a
   * Sends a registration request to the backend.
   * @param username The desired username.
   * @param email The user's email.
   * @param firstname The user's email.
   * @param lastname The user's email.
   * @param mobile The user's email.
   * @param password The desired password.
   * @param roles An optional array of roles (e.g., ['admin']). If not provided,
   * the backend will default to 'ROLE_USER'.
   * @returns An Observable of the HTTP response.
   */

   register(username : String,
    email : String,
    firstname : String,
    lastname : String,
    mobile : String,
    password : String,
  role?: String[]) : Observable<any>{
    const body: any = {
      username,
      firstname,
      lastname,
      email,
      mobile,
      password
    };
    if(role && role.length > 0){
      body.role = role; // Add roles to the request body if provided
    }

    return this.http.post(SERVER_URL + API_URLs.CORE.REGISTERATION , body, httpOptions);
  }

}
