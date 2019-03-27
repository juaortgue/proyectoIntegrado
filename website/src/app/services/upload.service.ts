import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { GymCreateDto } from '../dto/gym-create.dto';
const gymUrl = `${environment.apiUrl}/gyms`;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  uploadUrl: string;
  token = `?access_token=${this.authService.getToken()}`;
  masterKey = `?access_token=${environment.masterKey}`;
  
  public upload(files: Set<File>, newGym: GymCreateDto): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    
    this.uploadUrl = `${gymUrl}${this.token}`;
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('foto', file, file.name);
      formData.append('name', newGym.name);
      formData.append('address', newGym.address);
      formData.append('city', newGym.city);
      formData.append('description', newGym.description);
      formData.append('position', newGym.position);
      formData.append('price', newGym.price.toString());
      formData.append('province', newGym.province);
      formData.append('zipcode', newGym.zipcode);
      


      // create a http-post request and pass the form
      // tell it to report the upload progress
      console.log('aquiii')
      console.log(newGym)
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
