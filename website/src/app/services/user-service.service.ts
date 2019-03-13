import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/user-response';
import { environment } from 'src/environments/environment';
import { UserContainerResponse } from '../interfaces/userContainer-response';
const userUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  token = `?access_token=${this.authService.getToken()}`;
  
  getAllUsers(): Observable<UserContainerResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.get<UserContainerResponse>(`${userUrl}`, requestOptions);
  }
  remove(id: string): Observable<UserResponse[]> {
    return this.http.delete<UserResponse[]>(`${userUrl}/${id}${this.token}`);
  }


}
