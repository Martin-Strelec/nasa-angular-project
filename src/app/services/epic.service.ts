import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EPIC } from '../models/epic';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EpicService {
  private _apiEPICMetadata = environment.EPIC_URL;
  private _apiEPICArchive = environment.EPIC_ARCHIVE_URL;
  private _apiKey = environment.API_KEY;

  constructor(private _http: HttpClient) { }

  getEPICMetadata(date: string, imageType: string): Observable<EPIC[]> {
    return this._http.get<EPIC[]>(`${this._apiEPICMetadata}${imageType}/date/${date}?api_key=${this._apiKey}`);
  }
}

