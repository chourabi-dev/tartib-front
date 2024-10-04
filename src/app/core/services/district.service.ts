import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private endpoint = 'api/district'

  constructor(
    private _httpClient: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this._httpClient.get(`${this.endpoint}/all`);
  }

  getOne(id: any): Observable<any> {
    return this._httpClient.get(`${this.endpoint}/get/${id}`);
  }

  create(data: any): Observable<any> {
    return this._httpClient.post(`${this.endpoint}/create`, data);
  }

  update(id:any, data: any): Observable<any> {
    return this._httpClient.put(`${this.endpoint}/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this._httpClient.delete(`${this.endpoint}/delete/${id}`);
  }
}
