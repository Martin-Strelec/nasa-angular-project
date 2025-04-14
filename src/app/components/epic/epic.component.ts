import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { EPIC } from '../../models/epic';
import { EpicService } from '../../services/epic.service';
import { environment } from '../../../environments/environment.development';
import { EpicDetailsComponent } from "../epic-details/epic-details.component";
import { NewGalleryImage } from '../../models/galleryImage';
import { GalleryService } from '../../services/gallery.service';

declare var bootstrap: any; // declare bootstrap for TS

@Component({
  selector: 'app-epic',
  imports: [RouterModule, CommonModule, FormsModule, EpicDetailsComponent],
  templateUrl: './epic.component.html',
  styleUrl: './epic.component.css'
})
export class EpicComponent implements AfterViewInit {
  // Properties
  @ViewChild('carouselElement') carousel!: ElementRef;

  EPICs: EPIC[] = [];
  currentEPIC!: EPIC;
  selectedEPIC!: EPIC;
  errorMessage: string = '';
  imageType: string = 'enhanced';
  date: string = '';
  //Toast
  toastType: string = '';
  toastMessage: string = '';
  toastInstance: any;

  @Output() onEpicChange: EventEmitter<EPIC>;

  constructor(private _epicService: EpicService, private _gallery: GalleryService) {
    this.onEpicChange = new EventEmitter(); // Initialize the EventEmitter
  }
  ngOnInit() {
    const today = new Date();
    today.setDate(today.getDate() - 2); // Set to two days back
    this.date = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
  ngAfterViewInit() {
    const carouselEl = this.carousel.nativeElement;

    // Listen to Bootstrap slide event
    carouselEl.addEventListener('slid.bs.carousel', () => {
      this.getActiveSlideModel();
    });
    // Initial load
    this.getActiveSlideModel();
  }

  // Handles the image loading
  onImageLoad(photo: any) {
    console.log('Image loaded:', photo.img_src);
    // You could set a flag or update UI here
    photo.loaded = true;
  }

  // Hangles image loading error
  onImageError(photo: any) {
    console.warn('Failed to load image:', photo.img_src);
    photo.error = true;
  }

  // Sets the current image to the active one in the carousel
  getActiveSlideModel(): void {
    const activeEl = this.carousel.nativeElement.querySelector('.carousel-item.active');
    const index = parseInt(activeEl?.getAttribute('data-index'), 10);

    if (!isNaN(index)) {
      this.currentEPIC = this.EPICs[index];
      this.onEpicChange.emit(this.currentEPIC);
      console.log('Active model:', this.currentEPIC);
    }
  }

  // Function to reload the window
  reloadWindow() {
    window.location.reload();
  }

  //function to save the image
  saveImage() {
    let newImage: NewGalleryImage;
    if (this.selectedEPIC) {
      newImage = new NewGalleryImage(this.selectedEPIC.imageUrl, this.selectedEPIC.date);
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

  // fucntion to show toast
  showToast(type: string) {
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      this.toastInstance = new bootstrap.Toast(toastEl);
      this.toastType = type;
      this.toastInstance?.show();
    }
  }

  // function to open Modal
  openModal(epic: EPIC) {
    this.selectedEPIC = epic;
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Search button function
  loadData() {
    this.EPICs = []; // Clear the pictures array when the button is clicked
    console.log(this.date)
    this.getEPICs(this.imageType, this.date);
  }

  // Retrieves the image URL from the EPICs array and sets it to the imageUrl property of each EPIC object
  getPictures(epics: EPIC[], imageType: string) {
    epics.forEach(epic => {
      epic.imageUrl = `${environment.EPIC_ARCHIVE_URL}${imageType}/${epic.date.split(' ')[0].replace(/-/g, '/')}/png/${epic.image}.png?api_key=${environment.API_KEY}`;
    });

  }

  // Calls EpicService to get the EPICs
  getEPICs(imageType: string, date: string) {
    this._epicService.getEPICMetadata(date, imageType)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch EPIC images. Please try again later.';
          console.error('Error fetching EPIC metadata:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      )
      .subscribe({
        next: (response: EPIC[]) => {
          if (response.length === 0) {
            this.errorMessage = 'No EPIC images found for the selected date.';
            return; // Exit if no images are found
          }
          this.EPICs = response;
          console.log(response);
          this.errorMessage = ''; // Clear error message on success
          this.currentEPIC = this.EPICs[0]; // Set the first EPIC as the current one
          this.onEpicChange.emit(this.currentEPIC); // Initial emission of the first EPIC in the list
          this.getPictures(this.EPICs, imageType);
        },
        error: () => {
          // Optional: Handle additional error logic here
        }
      });
  }
}
