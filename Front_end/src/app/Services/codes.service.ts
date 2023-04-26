import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  // private baseUrl = 'http://localhost:8080/api/search';

  // constructor(private http: HttpClient) {}

  // // getCodes(): Observable<any[]> {
  // //   const url = `${this.baseUrl}/icd`;
  // //   return this.http.get<any[]>(url);
  // // }
  // getCodes(searchTerm: string): Observable<any[]> {
  //   const url = `${this.baseUrl}/icd?q=${searchTerm}`;
  //   return this.http.get<any[]>(url);
  // }


  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  get_ICD_Codes(searchTerm: string): Observable<any[]> {
    const params = new HttpParams().set('q', searchTerm);
    const url = `${this.baseUrl}/search/icd`;
    return this.http.get<any[]>(url, { params });
  }

    get_CPT_Codes(searchTerm: string): Observable<any[]> {
      const params = new HttpParams().set('q', searchTerm);
      const url = `${this.baseUrl}/search/cpt`;
      return this.http.get<any[]>(url, { params });
    }
  
}

