import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoResonse } from '../interfaces/geo-response';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  url = 'https://geocoder.api.here.com/6.2/geocode.json';
  app_id= 'fFZERUHIPjyqbU0O1rQy';
  app_code = 'I7_Oke0z4blb2pr1V7zp3Q';
  gen = '8';
  constructor(private http: HttpClient) { }

  getLocation(searchtext: string): Observable<GeoResonse> {
    return this.http.get<any>(`${this.url}?searchtext=${searchtext}&app_id=${this.app_id}&app_code=${this.app_code}&gen=${this.gen}`);
  }
}
