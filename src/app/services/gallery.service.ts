import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {GalleryImage} from '../models/galleryImage';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  private _siteURL = environment.GALLERY_DB_URL;
  constructor(private _http: HttpClient) { }

  getImages(): Observable<any> {
    return this._http.get<GalleryImage>(this._siteURL)
      .pipe(
        tap(data => console.log('image data/error' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
  }

  addImage(image: GalleryImage): Observable<any> {
    return this._http.post<GalleryImage>(this._siteURL, image)
      .pipe(
        tap(data => console.log('add image message/error' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
  }

  delImage(imageId: string): Observable<any> {
    let deleteURL = this._siteURL + "/" + imageId;
    return this._http.delete(deleteURL)
      .pipe(
        tap(data => console.log('del image message/error' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );

  }
  
  private handleError(err: HttpErrorResponse) {
    console.log('CarApiService: ' + err.message);
    return err.message;
  }

}
