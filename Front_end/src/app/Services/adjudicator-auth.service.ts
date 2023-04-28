import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Adjudicator_LoginRequest } from '../adjudicator_login_reguest';

@Injectable({
  providedIn: 'root'
})
export class AdjudicatorAuthService {


  
  private loginUrl = 'http://localhost:8080/api/adjudicator/login';
  
    constructor(private http: HttpClient,private router:Router) { }
  
    AuthenticateUser(adjudicator_LoginRequest: Adjudicator_LoginRequest): Observable<string> {
      return this.http.post<string>(this.loginUrl, adjudicator_LoginRequest, { responseType: 'text' as 'json' });
    }

    logout() {
      sessionStorage.removeItem('token'); // Remove JWT token from session storage
      localStorage.removeItem('token');
      this.router.navigate(['/workQueue'], { queryParams: { logout: true } }); // Redirect to login page with a query parameter to show logout message
    }

}
