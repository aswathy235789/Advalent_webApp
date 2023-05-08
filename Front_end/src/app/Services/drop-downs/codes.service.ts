import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodesService {


  constructor(private http: HttpClient) { }

  get_ICD_Codes(searchTerm: string): Observable<any[]> {
    const params = new HttpParams().set('q', searchTerm);
    const url = `${environment.baseUrl}/search/icd`;
    return this.http.get<any[]>(url, { params });
  }

    get_CPT_Codes(searchTerm: string): Observable<any[]> {
      const params = new HttpParams().set('q', searchTerm);
      const url = `${environment.baseUrl}/search/cpt`;
      return this.http.get<any[]>(url, { params });
    }
  
}

