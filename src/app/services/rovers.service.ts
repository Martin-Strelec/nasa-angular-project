import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { RoverPhoto, PhotoRoot, RoverRoot} from '../models/rover';

@Injectable({
  providedIn: 'root'
})
export class RoversService {
  private _apiRoverURL = environment.ROVERS_URL;
  private _apiKey = environment.API_KEY;


  constructor(private _http: HttpClient) { }

  getImagesBySol(roverName: string, sol: number): Observable<PhotoRoot> {
    return this._http.get<PhotoRoot>(`${this._apiRoverURL}rovers/${roverName}/photos?sol=${sol}&api_key=${this._apiKey}`);
  }

  getImagesByDate(roverName: string, date: string): Observable<PhotoRoot> {
    console.log(`${this._apiRoverURL}rovers/${roverName}/photos?earth_date=${date}&api_key=${this._apiKey}`);
    return this._http.get<PhotoRoot>(`${this._apiRoverURL}rovers/${roverName}/photos?earth_date=${date}&api_key=${this._apiKey}`);
  }

  getMissionManifest(roverName: string): Observable<RoverRoot> {
    return this._http.get<RoverRoot>(`${this._apiRoverURL}manifests/${roverName}?api_key=${this._apiKey}`);
  }
}
