import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { ExerciseCreateDto } from '../dto/exercise-create.dto';
import { ExercisePhotoDto } from '../dto/exercise-photo-dto';
import { GymCreateDto } from '../dto/gym-create.dto';
import { GymCreatePhotoDto } from '../dto/gym-photo-dto';
import { TrainingPhotoCreateDto } from '../dto/training-photo-dto';
import { MatSnackBar } from '@angular/material';
const trainingUrl = `${environment.apiUrl}/training/photo`;
const trainingEditUrl= `${environment.apiUrl}/training/`;
@Injectable({
  providedIn: 'root'
})
export class UploadTrainingService {
  uploadUrl: string;
  token = `?access_token=${this.authService.getToken()}`;
  masterKey = `?access_token=${environment.masterKey}`;
  constructor(private http: HttpClient, private authService: AuthenticationService, private snackBar: MatSnackBar) { }

  public upload(files: Set<File>, trainingDto: TrainingPhotoCreateDto): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    this.uploadUrl = `${trainingUrl}${this.token}`;
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('photo', file, file.name);
      formData.append('name', trainingDto.name);
      formData.append('target', trainingDto.target);
      formData.append('time', trainingDto.time);
     
      formData.append('level', trainingDto.level.toString());
      formData.append('description', trainingDto.description);
      var json_arr = JSON.stringify(trainingDto.exercises);
      // create a http-post request and pass the form
      // tell it to report the upload progress
      
      for (let i = 0; i < trainingDto.exercises.length; i++) {
        formData.append(`exercises[${i}]`, trainingDto.exercises[i]);
        
        
      }
      const req = new HttpRequest('POST', this.uploadUrl, formData, {
        reportProgress: true,
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      }, error=>{
        console.log('ERROR SERVICIO' + error)
        this.snackBar.open('This name already exists.', 'Close', {duration: 3000});
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
  public editWithPhoto(files: Set<File>, trainingDto: TrainingPhotoCreateDto, id:String): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    this.uploadUrl = `${trainingEditUrl}${id}/photo${this.token}`;
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('photo', file, file.name);
      formData.append('name', trainingDto.name);
      formData.append('target', trainingDto.target);
      formData.append('time', trainingDto.time);
     
      formData.append('level', trainingDto.level.toString());
      formData.append('description', trainingDto.description);
      var json_arr = JSON.stringify(trainingDto.exercises);
      // create a http-post request and pass the form
      // tell it to report the upload progress
      
      for (let i = 0; i < trainingDto.exercises.length; i++) {
        formData.append(`exercises[${i}]`, trainingDto.exercises[i]);
        
        
      }
      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('PUT', this.uploadUrl, formData, {
        reportProgress: true,
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      }, error=>{
        console.log('ERROR SERVICIO' + error)
        this.snackBar.open('This name already exists.', 'Close', {duration: 3000});
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}
