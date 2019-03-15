import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  uploadUrl: string;
  token = `?access_token=${this.authService.getToken()}`;
  masterKey = `?access_token=${environment.masterKey}`;
  public upload(files: Set<File>, idCanto: number): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    this.uploadUrl = `https://infinite-hollows-38239.herokuapp.com/productos?access_token=${this.token}`;
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('foto', file, file.name);
      formData.append('nombre', 'Correa');
      formData.append('codReferencia', '59127512');
      formData.append('descripcion', 'Correa HAS de traccion 8');
      formData.append('dimensiones', '3m x 60mm');
      formData.append('distribuidor', '5c8a1d524b8399345d1bfbd1');
      formData.append('categoria', '5c88fff7551c6100224c4cc3');

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
