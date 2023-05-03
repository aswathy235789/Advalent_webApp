import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Adjudicator_LoginRequest } from '../adjudicator_login_reguest';
import { LoginRequest } from '../login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
 
 
  private loginUrl = 'http://localhost:8080/api/login';
  
    constructor(private http: HttpClient,private router:Router) { }
  
    authenticateUser(loginRequest: LoginRequest): Observable<string> {
      return this.http.post<string>(this.loginUrl, loginRequest, { responseType: 'text' as 'json' });
    }

    logout() {
      sessionStorage.removeItem('token'); // Remove JWT token from session storage
      localStorage.removeItem('token');
      this.router.navigate(['/login'], { queryParams: { logout: true } }); // Redirect to login page with a query parameter to show logout message
    }
}




