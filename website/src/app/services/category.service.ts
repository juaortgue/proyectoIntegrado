import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryContainerResponse } from '../interfaces/categoryContainer-response';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
const categoryUrl = `${environment.apiUrl}/categories`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  token = `?access_token=${this.authService.getToken()}`;
  masterKey = `?access_token=${environment.masterKey}`;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllCategories(): Observable<CategoryContainerResponse> {
    return this.http.get<CategoryContainerResponse>(`${categoryUrl}${this.masterKey}`);
  }

  /*createCategory(categoryCreateDto: CategoryCreateDto): Observable<Category> {
    return this.http.post<Category>(`${categoryUrl}${this.token}`, categoryCreateDto);
  }

  updateCategory(id: string, resource: CategoryCreateDto): Observable<Category> {
    return this.http.put<Category>(`${categoryUrl}/${id}${this.token}`, resource);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${categoryUrl}/${id}${this.token}`);
  }*/
}
