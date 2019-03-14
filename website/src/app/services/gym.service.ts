import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { GymContainerResponse } from '../interfaces/gymContainer-response';
import { CategoryCreateDto } from '../dto/create-category.dto';
import { CategoryResponse } from '../interfaces/category-response';
import { GymCreateDto } from '../dto/gym-create.dto';
import { GymResponse } from '../interfaces/gym-response';

@Injectable({
  providedIn: 'root'
})
const gymUrl = `${environment.apiUrl}/gyms`;
export class GymService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  token = `?access_token=${this.authService.getToken()}`;
  masterKey = `?access_token=${environment.masterKey}`;

  getAllGyms(): Observable<GymContainerResponse> {
    return this.http.get<GymContainerResponse>(`${gymUrl}${this.masterKey}`);
  }

  createCategory(gymCreateDto: GymCreateDto): Observable<GymResponse> {
    return this.http.post<GymResponse>(`${gymUrl}${this.token}`, gymCreateDto);
  }

  updateCategory(id: string, resource: GymCreateDto): Observable<GymResponse> {
    return this.http.put<GymResponse>(`${gymUrl}/${id}${this.token}`, resource);
  }

  deleteCategory(id: number): Observable<GymResponse> {
    return this.http.delete<GymResponse>(`${gymUrl}/${id}${this.token}`);
  }
}
