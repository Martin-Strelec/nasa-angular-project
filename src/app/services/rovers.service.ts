import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Rover, RoverPhoto, Root} from '../models/rover';

@Injectable({
  providedIn: 'root'
})
export class RoversService {
  private _apiRoverURL = environment.ROVERS_URL;
  private _apiKey = environment.API_KEY;


  constructor(private _http: HttpClient) { }

  getImagesBySol(roverName: string, sol: number, camera:string): Observable<Root> {
    return this._http.get<Root>(`${this._apiRoverURL}rovers/${roverName}/photos?sol=${sol}&camera=${camera}&api_key=${this._apiKey}`);
  }

  getImagesByDate(roverName: string, date: string, camera:string): Observable<Root> {
    return this._http.get<Root>(`${this._apiRoverURL}rovers/${roverName}/photos?earth_date=${date}&camera=${camera}&api_key=${this._apiKey}`);
  }

  getMissionManifest(roverName: string): Observable<Rover[]> {
    return this._http.get<Rover[]>(`${this._apiRoverURL}manifests/${roverName}?api_key=${this._apiKey}`);
  }
}
