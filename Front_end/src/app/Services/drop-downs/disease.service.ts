import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor(private http: HttpClient) { }
  
  getAllDiseases(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/diseases`);
  }



}
