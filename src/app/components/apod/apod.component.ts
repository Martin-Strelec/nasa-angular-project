import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ApodService } from '../../services/apod.service';
import { Apod } from '../../models/apod';

@Component({
  selector: 'app-apod',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.css'
})
export class ApodComponent {
  pictures: Apod[] = []
  errorMessage: string = '';
  imageWidth: string = "600px";
  minVideoWidth: string = "300px";
  isChecked: boolean = false;
  startDate: string = '';
  endDate: string = '';
  sanitizedURLs: { [key: string]: SafeResourceUrl } = {};

  constructor(private _apodService: ApodService, private sanitizer: DomSanitizer) { }

  reloadWindow() {
    window.location.reload();
  }

  ngOnInit(): void {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    this.startDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  onSwitchChange(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.pictures = []; // Clear the pictures array when the switch is toggled
    console.log('Switch is ' + (this.isChecked ? 'ON' : 'OFF'));
  }

  loadData() {
    if (this.isChecked) {
      console.log(this.startDate, this.endDate);
      this.getPictures(this.startDate, this.endDate);
    }
    else {
      console.log(this.startDate);
      this.getPicture(this.startDate);
    }
  }

  getPicture(date: string) {
    this._apodService.getSingleAPOD(date)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch APOD image. Please try again later.';
          console.error('Error fetching APOD Picture:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      ).subscribe(
        picture => {
          this.pictures?.push(picture);
          this.sanitizeURLs(); // Sanitize URLs after fetching the pictures
          console.log(JSON.stringify(picture));
        }
      )
  }
  getPictures(startDate: string, endDate: string) {
    this._apodService.getMultipleAPOD(startDate, endDate)
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
          this.sanitizeURLs(); // Sanitize URLs after fetching the pictures
          console.log(JSON.stringify(pictures));
        }
      )
  }

  sanitizeURLs() {
    this.pictures.forEach(picture => {
      if (picture.media_type === 'video') {
        this.sanitizedURLs[picture.url] = this.sanitizer.bypassSecurityTrustResourceUrl(picture.url);
      }
    });
  }
}
