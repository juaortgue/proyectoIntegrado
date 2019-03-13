import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryContainerResponse } from '../interfaces/categoryContainer-response';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { CategoryResponse } from 'src/app/interfaces/category-response';
import { CategoryCreateDto } from '../dto/create-category.dto';
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

  createCategory(categoryCreateDto: CategoryCreateDto): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${categoryUrl}${this.token}`, categoryCreateDto);
  }

  updateCategory(id: string, resource: CategoryCreateDto): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${categoryUrl}/${id}${this.token}`, resource);
  }

  deleteCategory(id: number): Observable<CategoryResponse> {
    return this.http.delete<CategoryResponse>(`${categoryUrl}/${id}${this.token}`);
  }
}
