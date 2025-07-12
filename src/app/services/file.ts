import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URLs from '../appConstants/api-urls';
import { FileData } from '../modals/FileData';

// Base URL for backend API test endpoints

const SERVER_URL = environment.serverURL;

/**
 * Service to handle file-related operations with the backend,
 * including upload and potentially fetching metadata/downloading.
 */
@Injectable({
  providedIn: 'root'
})
export class File {
 

  constructor(private http: HttpClient) { }

  /**
   * Uploads PDF and Excel files along with their metadata.
   * @param pdfFile The PDF file to upload.
   * @param excelFile The Excel file to upload.
   * @param metadata The metadata object.
   * @returns An Observable for the HTTP upload progress.
   */
  upload(pdfFile: File, excelFile: File, metadata: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

   // formData.append('pdfFile', pdfFile); //Update in future
   // formData.append('excelFile', excelFile);
    // Convert metadata object to JSON string and append it
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));

    const req = new HttpRequest('POST', SERVER_URL + API_URLs.API_FILE.FILE_API + 'upload', formData, {
      reportProgress: true, // Report upload progress
      responseType: 'json'
    });

    return this.http.request(req);
  }

  /**
   * Fetches all file metadata from the backend.
   * This can be used for a list/search view.
   * @returns An Observable of the HTTP response containing a list of file metadata.
   */
  getAllFileMetadata(): Observable<any> {
    return this.http.get(SERVER_URL + API_URLs.API_FILE.FILE_API);
  }

  /**
   * Downloads a file from the backend by its fileId.
   * @param fileId The unique ID of the file to download.
   * @param fileType The type of the file (e.g., 'pdf', 'xlsx') to help set content type.
   * @returns An Observable of the HTTP response (blob, representing the file).
   */
  downloadFile(fileId: string, fileType: string): Observable<Blob> {
    return this.http.get(`${SERVER_URL + API_URLs.API_FILE.FILE_API}download/${fileId}`, {
      responseType: 'blob'
    });
  }

  getAllFileDataByDistrictVillageKhasraNo(
  district: string,
  village: string,
  khasraNo: string
): Observable<FileData[]> {
  const params = new HttpParams()
      .set('district', district)
      .set('village', village)
      .set('khasraNo', khasraNo);

  return this.http.get<FileData[]>(`${SERVER_URL + API_URLs.API_DATA.ALLDATA_FILTER}`, { params });
}

 getAllFileDataByDistrictVillageKhasraNoYearDocument(
 district: string,
  village: string,
   yearFrom: string,
    yearTo: string, 
    documents: string) :Observable<FileData[]>{

      const params = new HttpParams()
      .set('district', district)
      .set('village', village)
      .set('yearFrom', yearFrom)
      .set('yearTo', yearTo)
      .set('documents', documents)
      ;

    return this.http.get<FileData[]>(`${SERVER_URL + API_URLs.API_DATA.ALLDATAS_FILTER}`, { params });
  }
 

}
