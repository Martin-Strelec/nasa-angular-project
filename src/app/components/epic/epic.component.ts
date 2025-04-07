import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { EPIC } from '../../models/epic';
import { EpicService } from '../../services/epic.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-epic',
  imports: [RouterModule, CommonModule],
  templateUrl: './epic.component.html',
  styleUrl: './epic.component.css'
})
export class EpicComponent {
  EPICs: EPIC[] = [];
  EpicImages: string[] = [];
  errorMessage: string = '';
  imageType: string = 'enhanced';
  date: string = '2023-10-01';

  constructor(private _epicService: EpicService) { }

  ngOnInit() {
    this.getEPICs(this.imageType,this.date);  
  }

  reloadWindow() {
    window.location.reload();
  }

  getPictures(epics: EPIC[], imageType: string){
    epics.forEach(epic => {
      console.log(environment.EPIC_ARCHIVE_URL);
      epic.imageUrl = `${environment.EPIC_ARCHIVE_URL}${imageType}/${epic.date.split(' ')[0].replace(/-/g, '/')}/png/${epic.image}.png?api_key=${environment.API_KEY}`;
    });

  }
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
          this.EPICs = response;
          this.errorMessage = ''; // Clear error message on success
          this.getPictures(this.EPICs, imageType);
        },
        error: () => {
          // Optional: Handle additional error logic here
        }
      });
  }
}
