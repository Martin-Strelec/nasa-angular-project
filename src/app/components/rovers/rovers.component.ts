import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

import { RoversService } from '../../services/rovers.service';
import { PhotoManifest, RoverPhoto, PhotoRoot, RoverRoot } from '../../models/rover';
import { FormsModule } from '@angular/forms';
import { RoverDetailsComponent } from "../rover-details/rover-details.component";
import { GalleryService } from '../../services/gallery.service';
import { NewGalleryImage } from '../../models/galleryImage';

declare var bootstrap: any; // declare bootstrap for TS

@Component({
  selector: 'app-rovers',
  imports: [RouterModule, CommonModule, FormsModule, RoverDetailsComponent],
  templateUrl: './rovers.component.html',
  styleUrl: './rovers.component.css'
})
export class RoversComponent {
  picturesErrorMessage = '';
  errorMessage: string = '';
  isChecked: boolean = false;
  sol: number = 1;
  date: string = '';
  roverName: string = "curiosity";
  photos: RoverPhoto[] = [];
  groupedPhotos: { [key: string]: RoverPhoto[] } = {};
  currentManifest: PhotoManifest | null = null;
  selectedPhoto?: RoverPhoto;
  toastType: string = '';
  toastMessage: string = '';
  toastInstance: any;

  constructor(private _roversService: RoversService, private _gallery: GalleryService) { }

  ngOnInit(): void {
    const today = new Date();
    today.setDate(today.getDate() - 2); // Set to two days back
    this.date = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      this.toastInstance = new bootstrap.Toast(toastEl);
    }
  }

  reloadWindow() {
    window.location.reload();
  }

  onSwitchChange(event: Event) {
    this.resetValues();

    this.isChecked = (event.target as HTMLInputElement).checked;
    console.log('Switch is ' + (this.isChecked ? 'ON' : 'OFF'));
  }

  groupPhotosByCamera(photos: RoverPhoto[]): { [key: string]: any[] } {
    const grouped: { [cameraName: string]: RoverPhoto[] } = {};

    photos.forEach(photo => {
      const cameraName = photo.camera.full_name;
      if (!grouped[cameraName]) {
        grouped[cameraName] = [];
      }
      grouped[cameraName].push(photo);
    });
    return grouped;
  }

  loadData() {
    this.resetValues();
    if (this.isChecked) {
      console.log('Fetching images by sol:', this.sol);
      this.getRoverPhotosBySol(this.roverName, this.sol);
    }
    else {
      console.log('Fetching images by date:', this.date);
      this.getRoverPhotosByDate(this.roverName, this.date);
    }
    this.getRoverManifest(this.roverName);
  }

  onImageLoad(photo: any) {
    console.log('Image loaded:', photo.img_src);
    // You could set a flag or update UI here
    photo.loaded = true;
  }

  onImageError(photo: any) {
    console.warn('Failed to load image:', photo.img_src);
    photo.error = true;
  }

  resetValues() {
    this.picturesErrorMessage = '';
    this.errorMessage = '';
    this.photos = [];
    this.groupedPhotos = {};
    this.currentManifest = null;
  }

  //function to save the image
  saveImage() {
    let newImage: NewGalleryImage;
    if (this.selectedPhoto) {
      newImage = new NewGalleryImage(this.selectedPhoto.img_src, this.selectedPhoto.earth_date);
      this._gallery.addImage(newImage).subscribe((response) => {
        this.toastMessage = 'Image Saved Succesfully!'
        this.toastType = 'success'
        this.showToast();
        console.log('Image saved successfully:', response);
      }, (error) => {
        this.toastMessage = 'Error when saving image'
        this.toastType = 'danger'
        this.showToast();
        console.error('Error saving image:', error);
      });
    }
  }

  openModal(photo: RoverPhoto) {
    this.selectedPhoto = photo;
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  showToast(type: string = 'success') {
    this.toastType = type;
    this.toastInstance?.show();
  }

  getRoverPhotosByDate(roverName: string, date: string): void {
    this._roversService.getImagesByDate(roverName, date)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch Rover images. Please try again later.';
          console.error('Error fetching Rover metadata:', error);
          return throwError(() => error); // Updated to use the new signature
        })
      )
      .subscribe({
        next: (response: PhotoRoot) => {
          console.log('Rover metadata:', response);
          if (response.photos.length === 0) {
            this.picturesErrorMessage = 'No images found for the selected date.';
            return;
          }
          this.groupedPhotos = this.groupPhotosByCamera(response.photos);
        },
        error: () => {
          // Optional: Handle additional error logic here
        }
      });
  }

  getRoverPhotosBySol(roverName: string, sol: number): void {
    this._roversService.getImagesBySol(roverName, sol)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch Rover images. Please try again later.';
          console.error('Error fetching Rover metadata:', error);
          return throwError(() => error); // Updated to use the new signature
        })
      )
      .subscribe({
        next: (response: PhotoRoot) => {
          console.log(response);
          if (response.photos.length === 0) {
            this.picturesErrorMessage = 'No images found for the selected date.';
            return;
          }
          this.groupedPhotos = this.groupPhotosByCamera(response.photos);
        },
        error: () => {
          // Optional: Handle additional error logic here
        }
      });
  }

  getRoverManifest(roverName: string): void {
    this._roversService.getMissionManifest(roverName)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch Rover images. Please try again later.';
          console.error('Error fetching Rover metadata:', error);
          return throwError(() => error); // Updated to use the new signature
        })
      )
      .subscribe({
        next: (response: RoverRoot) => {
          if (response === null) {
            this.errorMessage = 'No information about selected rover.';
            return;
          }
          this.currentManifest = response.photo_manifest;
          console.log('Rover metadata:', this.currentManifest);
        },
        error: () => {
          // Optional: Handle additional error logic here
        }
      });
  }
}
