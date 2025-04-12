import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GalleryService } from '../../services/gallery.service';
import { GalleryImage } from '../../models/galleryImage';

declare var bootstrap: any; // declare bootstrap for TS

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  // Properties
  images: GalleryImage[] = [];
  selectedImage?: GalleryImage;
  errorMessage = '';

  constructor(private _gallery: GalleryService) { }

  ngOnInit() {
    this.getImages();
  }
  // Handles the image loading
  getImages() {
    this._gallery.getImages()
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to retrieve Gallery. Please try again later.';
          console.error('Error fetching Gallery:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      )
      .subscribe(images => {
        this.images = images;
        console.log(this.images);
      });
  }

  deleteImage(image: GalleryImage) {
    this._gallery.delImage(image._id)
    .pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to delete Image.';
        console.error('Error deleting image:', error);
        return throwError(error); // Rethrow the error for further handling if needed
      })
    )
    .subscribe(result => {
      console.log('Image deleted successfully:', result);
      this.getImages(); // Refresh the image list after deletion
    });
  }

  openModal(image: GalleryImage) {
    this.selectedImage = image;
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
