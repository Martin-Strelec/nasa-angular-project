import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ApodService } from '../../services/apod.service';
import { Apod } from '../../models/apod';

@Component({
  selector: 'app-apod-details',
  imports: [CommonModule],
  templateUrl: './apod-details.component.html',
  styleUrl: './apod-details.component.css'
})
export class ApodDetailsComponent {
  apodDate?: string | null
  apodDetails?: Apod;
  errorMessage: string = '';
  imageHeight: string = "200px";
  sanitizedVideoUrl: SafeResourceUrl | null = null;

  constructor(private route: ActivatedRoute, private _apodService: ApodService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.apodDate = this.route.snapshot.paramMap.get('date');
    console.log(this.apodDate);
    this.fetchDetails(this.apodDate!);
  }

  reloadWindow() {
    window.location.reload();
  }

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
