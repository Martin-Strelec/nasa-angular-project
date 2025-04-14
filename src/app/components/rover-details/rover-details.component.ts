import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoManifest } from '../../models/rover';

@Component({
  selector: 'app-rover-details',
  imports: [CommonModule],
  templateUrl: './rover-details.component.html',
  styleUrl: './rover-details.component.css'
})
export class RoverDetailsComponent implements OnChanges {

  @Input() photoManifest!: PhotoManifest;

  // Different approach to updating input when parent component updates the output value
  ngOnChanges(changes: SimpleChanges) {
    if (changes['roverManifest'] && changes['roverManifest'].currentValue) {
      console.log('Rover updated:', this.photoManifest);
    }
  }
}
