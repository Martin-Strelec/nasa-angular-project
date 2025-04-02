import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Asteroid, Asteroids } from '../models/asteroids';
import { AsteroidDetails } from '../models/asteroidDetails';

@Injectable({
  providedIn: 'root'
})
export class AsteroidsService {
  private _apiFeedURL = environment.ASTEROIDS_URL;
  private _apiNeoURL = environment.ASTEROIDS_DETAILS_URL;
  private _apiKey = environment.API_KEY;

  constructor(private _http: HttpClient) { }

  getAsteroids(start_date: string, end_date: string): Observable<Asteroids> {
    return this._http.get<Asteroids>(`${this._apiFeedURL}?api_key=${this._apiKey}&start_date=${start_date}&end_date=${end_date}`);
  }
  getAsteroidDetails(asteroidId: string) :Observable<AsteroidDetails> {
    return this._http.get<AsteroidDetails>(`${this._apiNeoURL}${asteroidId}?api_key=${this._apiKey}`);
  }
}
