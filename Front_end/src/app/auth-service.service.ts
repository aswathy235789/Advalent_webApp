import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from './login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
 
  private loginUrl = 'http://localhost:8080/api/login';
  
    constructor(private http: HttpClient) { }
  
    authenticateUser(loginRequest: LoginRequest): Observable<string> {
      return this.http.post<string>(this.loginUrl, loginRequest, { responseType: 'text' as 'json' });
    }
}


