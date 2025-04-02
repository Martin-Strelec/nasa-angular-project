import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AsteroidDetails } from '../../models/asteroidDetails';
import { AsteroidsService } from '../../services/asteroids.service';

@Component({
  selector: 'app-asteroid-details',
  imports: [CommonModule],
  templateUrl: './asteroid-details.component.html',
  styleUrl: './asteroid-details.component.css'
})
export class AsteroidDetailsComponent {
  asteroidId?: string | null
  asteroidDetails?: AsteroidDetails;

  constructor(private route: ActivatedRoute, private _asteroidsService: AsteroidsService) { }

  ngOnInit() {
    this.asteroidId = this.route.snapshot.paramMap.get('id');
    if (this.asteroidId) {
      this._asteroidsService.getAsteroidDetails(this.asteroidId).subscribe((response: AsteroidDetails) => {
        this.asteroidDetails = response;
        console.log(this.asteroidDetails);
      });
    }
  }
}
