import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrainingContainerResponse } from '../interfaces/traningContainer-response';
import { TrainingResponse } from '../interfaces/training-response';
import { TrainingOneResponse } from '../interfaces/training-one-response';
import { TrainingCreateDto } from '../dto/training-create.dto';
const trainingUrl = `${environment.apiUrl}/training`;

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  token = `?access_token=${this.authService.getToken()}`;
  masterKey = `?access_token=${environment.masterKey}`;

  getAll(): Observable<TrainingContainerResponse> {
    return this.http.get<TrainingContainerResponse>(`${trainingUrl}${this.masterKey}`);
  }

  create(gymCreateDto: TrainingCreateDto): Observable<TrainingResponse> {
    return this.http.post<TrainingResponse>(`${trainingUrl}${this.token}`, gymCreateDto);
  }

  update(id: string, resource: TrainingCreateDto): Observable<TrainingResponse> {
    return this.http.put<TrainingResponse>(`${trainingUrl}/${id}${this.token}`, resource);
  }

  delete(id: number): Observable<TrainingResponse> {
    return this.http.delete<TrainingResponse>(`${trainingUrl}/${id}${this.token}`);
  }
  getOne(id:string): Observable<TrainingOneResponse> {
    return this.http.get<TrainingOneResponse>(`${trainingUrl}/${id}${this.masterKey}`);
  }
}
