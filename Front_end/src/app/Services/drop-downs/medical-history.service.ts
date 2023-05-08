import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  constructor(private http: HttpClient) { }

  addDiseasesToMember(memberId: number, diseases: string[]): Observable<any> {
    return this.http.post(`${environment.baseUrl}/${memberId}/diseases`, diseases);
  }
}
