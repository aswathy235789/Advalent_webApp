import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }
  
  getAllDiseases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}api/diseases`);
  }



}
