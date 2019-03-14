import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../dto/login-dto';
import { LoginResponse } from '../interfaces/login-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
const masterKey= '{"access_token": "eZbDdICdMMhDPsvsP38p3BP5HTTjel95"}';

const authUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  request(email: String, password: String) {
    let emailPass: String;
    emailPass = btoa(email + ':' + password);
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${emailPass}`
      })
    };

    return requestOptions;
  }
  constructor(private http: HttpClient,private router: Router) { }
  login(loginDto: LoginDto): Observable<LoginResponse> {
    const requestOptions = this.request(loginDto.email, loginDto.password);
    return this.http.post<LoginResponse>(`${authUrl}/auth`, masterKey, requestOptions);
  }
  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('name', loginResponse.user.name);
    localStorage.setItem('email', loginResponse.user.email);
    localStorage.setItem('role', loginResponse.user.role);
    localStorage.setItem('picture', loginResponse.user.picture);
    
  }
  logout() {
    localStorage.clear();
    this.router.navigate ( [ '/' ] );    

  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getName(): string {
    return localStorage.getItem('name');
  }
  getEmail(): string {
    return localStorage.getItem('email');
  }

  getPicture(): string {
    return localStorage.getItem('picture');
  }
  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }
}
