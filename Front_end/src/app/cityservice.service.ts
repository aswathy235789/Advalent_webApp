// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CityserviceService {

//   constructor() { }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CityserviceService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllStates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}states`);
  }

  getCitiesByState(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}states/${stateId}/cities`);
  }
}

