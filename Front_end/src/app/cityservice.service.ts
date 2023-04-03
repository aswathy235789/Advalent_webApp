import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CityserviceService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }


  

  getAllStates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}api/states`);
  }

  getCitiesByState(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}api/${stateId}/cities`);
  }

 



  
}

