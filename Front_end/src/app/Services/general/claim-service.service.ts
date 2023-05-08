import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Claims } from '../../claims';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimServiceService {
 
  private claimsUrl = `${environment.baseUrl}/claims`;

  constructor(private http: HttpClient) {}


  getClaimById(id: string): Observable<Claims> {
    const url = `${this.claimsUrl}/status/${id}`;
    return this.http.get<Claims>(url).pipe(
      catchError(this.handleError)
    );
  }
  claimSubmission(claimData: any) {
     return this.http.post(`${this.claimsUrl}/submission`, claimData);
    
    }

    private handleError(error: any) {
      console.error(error);
      return throwError('An error occurred, please try again later.');
    }
  
 
  
}
