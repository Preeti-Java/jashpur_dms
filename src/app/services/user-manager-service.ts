import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API_URLs from '../appConstants/api-urls';
import { environment } from '../environments/environment';
import { Users } from '../modals/Users';
import { map, Observable } from 'rxjs';




// Base URL for backend API test endpoints

const SERVER_URL = environment.serverURL;

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
 
  
private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
private headers2 = new HttpHeaders({  'Content-Type': 'text/plain' });

constructor(private _http: HttpClient) { }
  
  loadVillageList() {  
    return this._http.get(SERVER_URL + API_URLs.API_DATA.VILLAGE_LIST);
  }

 loadUserList(role: string) {
  return this._http.get<Users[]>(
    SERVER_URL + API_URLs.API_USER.USER_LIST_BY_ROLE,
    {
      params: { role }  // sends as ?role=ADMIN
    }
  );
}


  createUser(newUser: Users) {
    return this._http.post<any>(SERVER_URL+API_URLs.API_USER.USER_CREATE, newUser,{
      headers:this.headers,
    }).pipe(map((data: any) => {            
            console.log("Response" + JSON.stringify(data));
           return data;
        }));
  }

   getUserProfile(username: string ) : Observable<Users>{
    return this._http.get<Users>(`${SERVER_URL + API_URLs.API_USER.USER_PROFILE}`,{
      params: { username }  
    });
  }
}
