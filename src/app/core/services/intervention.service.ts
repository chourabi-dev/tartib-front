import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  private endpoint = 'api/project-intervetion'
  private fileReaderEndPoint = 'api/uploads'
  

  constructor(
    private _httpClient: HttpClient
  ) { }

  create(data: any): Observable<any> {
    return this._httpClient.post(`${this.endpoint}/create`,data);
  }

  getFilebyNameID(filename:string): Observable<any> {
    return this._httpClient.get(`${this.fileReaderEndPoint}/get-file/${filename}`);
  }

  


  
}
