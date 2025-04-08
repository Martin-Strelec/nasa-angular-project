import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

import { RoversService } from '../../services/rovers.service';
import { Rover, RoverPhoto, Root } from '../../models/rover';


@Component({
  selector: 'app-rovers',
  imports: [RouterModule, CommonModule],
  templateUrl: './rovers.component.html',
  styleUrl: './rovers.component.css'
})
export class RoversComponent {

  errorMessage: string = '';
  roverPhotosFHAZ?: Root;
  roverPhotosRHAZ?: Root;
  roverPhotosNAVCAM?: Root;

  constructor(private _roversService: RoversService) { }
  
  ngOnInit(): void {
    this.getRoverPhotos('Curiosity', "2020-10-05", "FHAZ");
    this.getRoverPhotos('Curiosity', "2020-10-05", "RHAZ");
    this.getRoverPhotos('Curiosity', "2020-11-05", "NAVCAM");
  }
  
  reloadWindow() {
    window.location.reload();
  }

  getRoverPhotos(roverName: string, date: string, camera: string): void {
      this._roversService.getImagesByDate(roverName, date, camera)
        .pipe(
          catchError(error => {
            this.errorMessage = 'Failed to fetch EPIC images. Please try again later.';
            console.error('Error fetching EPIC metadata:', error);
            return throwError(() => error); // Updated to use the new signature
          })
        )
        .subscribe({
          next: (response: Root) => {
            if (camera === 'FHAZ') {
              this.roverPhotosFHAZ = response;
              console.log(this.roverPhotosFHAZ);
            } else if (camera === 'RHAZ') {
              this.roverPhotosRHAZ = response;
              console.log(this.roverPhotosRHAZ);
            } else if (camera === 'NAVCAM') {
              this.roverPhotosNAVCAM = response;
              console.log(this.roverPhotosNAVCAM);
            }
          }
        });
    }
}
