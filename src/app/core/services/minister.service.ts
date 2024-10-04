import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinisterService {

    private endpoint = 'api/minister'

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
    return this._httpClient.post(`${this.endpoint}/create`,data);
  }

  update(id, data: any): Observable<any> {
    return this._httpClient.put(`${this.endpoint}/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this._httpClient.get(`${this.endpoint}/delete/${id}`);
  }

}
