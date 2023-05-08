import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CityserviceService {

    constructor(private http: HttpClient) { }
  

  getAllStates(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/states`);
  }

  getCitiesByState(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/${stateId}/cities`);
  }

 
}

