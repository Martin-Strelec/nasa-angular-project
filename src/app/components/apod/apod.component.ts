import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ApodService } from '../../services/apod.service';
import { Apod } from '../../models/apod';
import { SimpleCacheService } from '../../services/simple-cache.service';

@Component({
  selector: 'app-apod',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.css'
})
export class ApodComponent {
  pictures: Apod[] = [];
  errorMessage: string = '';
  imageHeight: string = "400px";
  isChecked: boolean = false;
  startDate: string = '';
  endDate: string = '';
  sanitizedURLs: { [key: string]: SafeResourceUrl } = {};

  constructor(private _apodService: ApodService, private sanitizer: DomSanitizer, private simpleCache: SimpleCacheService) { }

  reloadWindow() {
    window.location.reload();
  }

  ngOnInit(): void {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    this.startDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    if (this.simpleCache.items.length && this.areItemsApods(this.simpleCache.items)) {
      this.pictures = this.simpleCache.items;
      this.sanitizedURLs = this.simpleCache.sanitizedURLs;
    }
    else {
      this.pictures = []; // Initialize to an empty array if the cache is empty or invalid
      this.simpleCache.items = []; // Clear the cache if it's invalid
    }
  }

  onSwitchChange(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    console.log('Switch is ' + (this.isChecked ? 'ON' : 'OFF'));
  }

  private areItemsApods(items: any[]): items is Apod[] {
      return items.every(item => this.isApod(item));
    }

  private isApod(item: any): item is Apod {
      return item && 
      typeof item.date === 'string' && 
      typeof item.title === 'string' &&
      typeof item.explanation === 'string' &&
      typeof item.url === 'string'
    } 

  loadData() {
    this.pictures = []; // Clear the pictures array when the button is clicked
    this.simpleCache.items = []; // Clear the cache when the button is clicked
    this.simpleCache.sanitizedURLs = {}; // Clear the sanitized URLs cache
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
          this.simpleCache.items.push(picture); // Cache the picture
          this.sanitizeURLs(); // Sanitize URLs after fetching the pictures
          this.simpleCache.sanitizedURLs = this.sanitizedURLs; // Update the cache with sanitized URLs
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
          this.simpleCache.items = pictures; // Cache the pictures
          this.sanitizeURLs(); // Sanitize URLs after fetching the pictures
          this.simpleCache.sanitizedURLs = this.sanitizedURLs; // Update the cache with sanitized URLs
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
