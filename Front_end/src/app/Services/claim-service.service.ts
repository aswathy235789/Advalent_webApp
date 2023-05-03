import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClaimServiceService {
  getClaimStatus(claimId: any) {
    throw new Error('Method not implemented.');
  }
 
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getClaimById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/claims/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = error.error.message;
    } else {
      // server-side error
      errorMessage = error.error;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
