import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${environment.baseUrl}/register`, data, httpOptions).pipe(
      map((response: any) => {
        // Process the response data if needed
        return response;
      }),
      catchError((error: any) => {
        // Handle errors if needed
        return throwError(error);
      })
    );
  }



}
