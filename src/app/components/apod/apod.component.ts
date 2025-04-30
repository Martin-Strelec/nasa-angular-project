import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ApodService } from '../../services/apod.service';
import { Apod } from '../../models/apod';
import { NewGalleryImage } from '../../models/galleryImage';
import { GalleryService } from '../../services/gallery.service';

declare var bootstrap: any; // declare bootstrap for TS

@Component({
  selector: 'app-apod',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.css'
})
export class ApodComponent {
  //Properties
  pictures: Apod[] = [];
  errorMessage: string = '';
  imageHeight: string = "400px";
  isChecked: boolean = false;
  startDate: string = '';
  endDate: string = '';
  sanitizedURLs: { [key: string]: SafeResourceUrl } = {};
  selectedApod: Apod | undefined;
  // Toast
  toastType: string = '';
  toastMessage: string = '';
  toastInstance: any;

  constructor(private _apodService: ApodService, private sanitizer: DomSanitizer, private _gallery: GalleryService) { }

  // Closing alert 
  closeAlert() {
    this.errorMessage='';
  }

  ngOnInit(): void {
    this.pictures = []; // Initialize to an empty array if the cache is empty or invalid
    // Initialize the date range to today
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    this.startDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  //Function for opening modal
  openModal(apod: Apod) {
    this.selectedApod = apod;
    const modalElement = document.getElementById('imageModal'); //Getting the dom element
    if (modalElement) {
      const modalRef = new bootstrap.Modal(modalElement);
      modalRef.show(); // Using bootstraps js to open modal
    }
  }

  //Function to show toast
  showToast(type: string) {
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      this.toastInstance = new bootstrap.Toast(toastEl);
      this.toastType = type;
      this.toastInstance?.show();
    }
  }

  //function to save the image
  saveImage() {
    let newImage: NewGalleryImage;
    if (this.selectedApod) {
      newImage = new NewGalleryImage(this.selectedApod.url, this.selectedApod.date);
      this._gallery.addImage(newImage).subscribe((response) => {
        this.toastMessage = 'Image Saved Succesfully!'
        this.showToast('success');
        console.log('Image saved successfully:', response);
      }, (error) => {
        this.toastMessage = 'Error when saving image'
        this.showToast('danger');
        console.error('Error saving image:', error);
      });
    }
  }

  // Function to handle switch change event
  onSwitchChange(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    console.log('Switch is ' + (this.isChecked ? 'ON' : 'OFF'));
  }

  // Function to handle the button click event
  loadData() {
    this.pictures = []; // Clear the pictures array when the button is clicked
    if (this.isChecked) {
      console.log(this.startDate, this.endDate);
      this.getPictures(this.startDate, this.endDate);
    }
    else {
      console.log(this.startDate);
      this.getPicture(this.startDate);
    }
  }

  // Function to handle image load event
  onImageLoad(photo: any) {
    console.log('Image loaded:', photo.img_src);
    // You could set a flag or update UI here
    photo.loaded = true;
  }

  // Function to handle image error event
  onImageError(photo: any) {
    console.warn('Failed to load image:', photo.img_src);
    photo.error = true;
  }

  // Calling APOD service
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
        });
  }

  // Calling APOD service
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
        });
  }

  // Function to sanitize URLs for video embedding
  sanitizeURLs() {
    this.pictures.forEach(picture => {
      if (picture.media_type === 'video') {
        this.sanitizedURLs[picture.url] = this.sanitizer.bypassSecurityTrustResourceUrl(picture.url);
      }
    });
  }
}
