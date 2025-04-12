import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ApodService } from '../../services/apod.service';
import { Apod } from '../../models/apod';
import { GalleryService } from '../../services/gallery.service';
import { GalleryImage, NewGalleryImage } from '../../models/galleryImage';

declare var bootstrap: any; // declare bootstrap for TS

@Component({
  selector: 'app-apod-details',
  imports: [CommonModule],
  templateUrl: './apod-details.component.html',
  styleUrl: './apod-details.component.css'
})
export class ApodDetailsComponent {
  // Properties
  apodDate?: string | null
  apodDetails?: Apod;
  errorMessage: string = '';
  imageHeight: string = "200px";
  sanitizedVideoUrl: SafeResourceUrl | null = null;
  toastType: string = '';
  toastMessage: string = '';
  toastInstance: any;


  constructor(private route: ActivatedRoute, private _apodService: ApodService, private _gallery: GalleryService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.apodDate = this.route.snapshot.paramMap.get('date');
    console.log(this.apodDate);
    this.fetchDetails(this.apodDate!);
  }

  // Function to reload the window
  reloadWindow() {
    window.location.reload();
  }

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
    newImage = new NewGalleryImage(this.apodDetails!.url, this.apodDetails!.date);
    this._gallery.addImage(newImage).subscribe((response) => {
      this.toastMessage = 'Image Saved Succesfully!'
      this.showToast('success');
      console.log('Image saved successfully:', response);
    }, (error) => {
      this.toastMessage = 'Error when saving image'
      this.toastType = 'danger'
      this.showToast('danger');
      console.error('Error saving image:', error);
    });
  }

  // Calling APOD Service to fetch APOD details
  fetchDetails(apodDate: string) {
    if (apodDate) {
      this._apodService.getSingleAPOD(apodDate)
        .pipe(
          catchError((error) => {
            this.errorMessage = 'Failed to fetch APOD details. Please try again later.';
            console.error('Error fetching APOD metadata:', error);
            return throwError(error); // Rethrow the error for further handling if needed
          })
        ).subscribe((response: Apod) => {
          this.apodDetails = response;
          if (this.apodDetails.media_type === 'video') {
            this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.apodDetails.url);
            console.log(this.apodDetails);
          }
        });
    }
  }

}
