import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private _epicService: EpicService) { }

  ngOnInit() {
    this.getEPICs();  
  }
  getPictures(epics: EPIC[], imageType: string){
    epics.forEach(epic => {
      console.log(`https://api.nasa.gov/EPIC/archive/${imageType}/${epic.date.split(' ')[0].replace(/-/g, '/')}/png/${epic.image}.png?api_key=${environment.API_KEY}`);
      this.EpicImages.push(`https://api.nasa.gov/EPIC/archive/${imageType}/${epic.date.split(' ')[0].replace(/-/g, '/')}/png/${epic.image}.png?api_key=${environment.API_KEY}`);
      console.log(this.EpicImages);
    });

  }
  getEPICs() {
    this._epicService.getEPICMetadata('2023-10-01', 'enhanced').subscribe((response: EPIC[]) => {
      this.EPICs = response;
      console.log(this.EPICs);
      this.getPictures(this.EPICs, 'enhanced');
    });
  }
}
