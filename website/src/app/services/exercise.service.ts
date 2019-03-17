import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { ExerciseContainerResponse } from '../interfaces/exerciseContainer-response';
import { HttpClient } from '@angular/common/http';
import { ExerciseResponse } from '../interfaces/exercise-response';
import { ExerciseCreateDto } from '../dto/exercise-create.dto';
import { ExerciseOneResponse } from '../interfaces/exercise-one-response';
const exerciseUrl = `${environment.apiUrl}/exercises`;

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  token = `?access_token=${this.authService.getToken()}`;
  masterKey = `?access_token=${environment.masterKey}`;

  getAll(): Observable<ExerciseContainerResponse> {
    return this.http.get<ExerciseContainerResponse>(`${exerciseUrl}${this.masterKey}`);
  }

  create(exerciseCreateDto: ExerciseCreateDto): Observable<ExerciseResponse> {
    return this.http.post<ExerciseResponse>(`${exerciseUrl}${this.token}`, exerciseCreateDto);
  }

  update(id: string, resource: ExerciseCreateDto): Observable<ExerciseResponse> {
    return this.http.put<ExerciseResponse>(`${exerciseUrl}/${id}${this.token}`, resource);
  }

  delete(id: number): Observable<ExerciseResponse> {
    return this.http.delete<ExerciseResponse>(`${exerciseUrl}/${id}${this.token}`);
  }
  getOne(id:string): Observable<ExerciseOneResponse> {
    return this.http.get<ExerciseOneResponse>(`${exerciseUrl}/${id}${this.masterKey}`);
  }
}
