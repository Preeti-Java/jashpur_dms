import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import API_URLs from '../appConstants/api-urls';

// Define HTTP headers for content type (JSON)
const SERVER_URL = environment.serverURL;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
 

  constructor(private _http: HttpClient) { }

  downloadCSV(): Observable<Blob> {
  const headers = new HttpHeaders({ 'Accept': 'text/csv' });
  return this._http.get(SERVER_URL + API_URLs.API_CSV.FILE_API , {
    headers: headers,
    responseType: 'blob'
  });
}
}
