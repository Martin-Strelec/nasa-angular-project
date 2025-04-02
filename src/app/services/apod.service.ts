import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Apod } from '../models/apod';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApodService {

  private _apiURL = environment.APOD_URL;
  private _apiKey = environment.API_KEY;

  constructor(private _http: HttpClient) { }

  getSingleAPOD(date: string): Observable<Apod> {
    return this._http.get<Apod>(`${this._apiURL}/?api_key=${environment.API_KEY}&date=${date}`).pipe(
      map(response => ({
          date: response.date,
          explanation: response.explanation,
          hdurl: response.hdurl,
          media_type: response.media_type,
          service_version: response.service_version,
          title: response.title,
          url: response.url
        }))
    );
  }
}
