import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EPIC } from '../../models/epic';

@Component({
  selector: 'app-epic-details',
  imports: [CommonModule],
  templateUrl: './epic-details.component.html',
  styleUrl: './epic-details.component.css'
})
export class EpicDetailsComponent {
  @Input() epic!: EPIC;
}
