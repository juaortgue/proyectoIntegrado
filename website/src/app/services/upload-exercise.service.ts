import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { ExerciseCreateDto } from '../dto/exercise-create.dto';
import { ExercisePhotoDto } from '../dto/exercise-photo-dto';
const exercisesUrl = `${environment.apiUrl}/exercises/photo`;
const exerciseEditUrl= `${environment.apiUrl}/exercises/`;
@Injectable({
  providedIn: 'root'
})

export class UploadExerciseService {
  uploadUrl: string;
  token = `?access_token=${this.authService.getToken()}`;
  masterKey = `?access_token=${environment.masterKey}`;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public upload(files: Set<File>, exercisePhotoDto: ExercisePhotoDto): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    this.uploadUrl = `${exercisesUrl}${this.token}`;
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('photo', file, file.name);
      formData.append('name', exercisePhotoDto.name);
      formData.append('categoryId', exercisePhotoDto.categoryId);
      formData.append('series', exercisePhotoDto.series.toString());
      formData.append('repetitions', exercisePhotoDto.repetitions.toString());
      formData.append('finishTime', exercisePhotoDto.finishTime);
      formData.append('restTime', exercisePhotoDto.restTime);
      formData.append('description', exercisePhotoDto.description);

      // create a http-post request and pass the form
      // tell it to report the upload progress
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
        //return 'nameError';
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
  public editWithPhoto(files: Set<File>, exercisePhotoDto: ExercisePhotoDto, id:String): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    this.uploadUrl = `${exerciseEditUrl}${id}/photo${this.token}`;
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('photo', file, file.name);
      formData.append('name', exercisePhotoDto.name);
      formData.append('categoryId', exercisePhotoDto.categoryId);
      formData.append('series', exercisePhotoDto.series.toString());
      formData.append('repetitions', exercisePhotoDto.repetitions.toString());
      formData.append('finishTime', exercisePhotoDto.finishTime);
      formData.append('restTime', exercisePhotoDto.restTime);
      formData.append('description', exercisePhotoDto.description);

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
