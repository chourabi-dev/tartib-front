import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistrictModel } from '../models/district.model';
import { GovernorateModel } from '../models/governorate.model';
import { DelegationModel } from '../models/delegeation.model';
import { DeanshipModel } from '../models/deanship.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private endpoint = 'api/locations'

  constructor( private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(`${this.endpoint}/all`);
  }
  // Get all districts
  getDistricts(): Observable<DistrictModel[]> {
    return this.http.get<DistrictModel[]>(`${this.endpoint}/districts`);
  }

  // Get governorates by a list of district IDs
  getGovernoratesByDistricts(districtIds: number[]): Observable<GovernorateModel[]> {
    const url = `${this.endpoint}/governorates?districtIds=${districtIds.join(',')}`;
    return this.http.get<GovernorateModel[]>(url);
  }

  // Get delegations by a list of governorate IDs
  getDelegationsByGovernorates(governorateIds: number[]): Observable<DelegationModel[]> {
    const url = `${this.endpoint}/delegations?governorateIds=${governorateIds.join(',')}`;
    return this.http.get<DelegationModel[]>(url);
  }

  // Get deanships by a list of delegation IDs
  getDeanshipsByDelegations(delegationIds: number[]): Observable<DeanshipModel[]> {
    const url = `${this.endpoint}/deanships?delegationIds=${delegationIds.join(',')}`;
    return this.http.get<DeanshipModel[]>(url);
  }
}
