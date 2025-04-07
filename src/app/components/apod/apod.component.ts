import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterModule } from '@angular/router';

import { ApodService } from '../../services/apod.service';
import { Apod } from '../../models/apod';

@Component({
  selector: 'app-apod',
  imports: [CommonModule, RouterModule],
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.css'
})
export class ApodComponent {
  picture?: Apod
  pictures?: Apod[]
  errorMessage: string = '';
  imageWidth: string = "600px";

  constructor(private _apodService: ApodService) { }

  reloadWindow() {
    window.location.reload();
  }

  getPicture() {
    this._apodService.getSingleAPOD("2015-12-10")
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch APOD image. Please try again later.';
          console.error('Error fetching APOD Picture:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      ).subscribe(
        picture => {
          this.picture = picture;
          console.log(JSON.stringify(picture));
        }
      )
  }
  getPictures() {
    this._apodService.getMultipleAPOD("2015-12-10", "2015-12-11")
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch APOD Images. Please try again later.';
          console.error('Error fetching APOD images:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      )
      .subscribe(
        pictures => {
          this.pictures = pictures;
          console.log(JSON.stringify(pictures));
        }
      )
  }
}
