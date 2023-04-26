import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  baseUrl=`http://localhost:8080/api/providers`;


  constructor(private http: HttpClient) { }

  getAllProviders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
