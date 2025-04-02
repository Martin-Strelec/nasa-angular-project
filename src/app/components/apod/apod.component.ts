import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';

import { RouterModule } from '@angular/router';
import { ApodService } from '../../services/apod.service';
import { Apod } from '../../models/apod';

@Component({
  selector: 'app-apod',
  imports: [CommonModule, RouterModule],
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.css'
})
export class ApodComponent {
  picture?: Apod
  pictures?: Apod[]
  imageWidth: string = "600px";

  constructor (private _apodService: ApodService) {}

  getPicture() {
    this._apodService.getSingleAPOD("2015-12-10").subscribe(
      picture => {
        this.picture = picture;
        console.log(JSON.stringify(picture));
      }
    )
  }
  getPictures() {
    this._apodService.getMultipleAPOD("2015-12-10", "2015-12-11").subscribe(
      pictures => {
        this.pictures = pictures;
        console.log(JSON.stringify(pictures));
      }
    )
  }
}
