import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AsteroidDetails } from '../../models/asteroidDetails';
import { AsteroidsService } from '../../services/asteroids.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Asteroid } from '../../models/asteroids';


@Component({
  selector: 'app-asteroid-details',
  imports: [CommonModule],
  templateUrl: './asteroid-details.component.html',
  styleUrl: './asteroid-details.component.css'
})
export class AsteroidDetailsComponent {
  // Properties
  @Input() asteroidId: string = '';
  asteroidDetails?: AsteroidDetails;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private _asteroidsService: AsteroidsService) { }

  ngOnInit() {
    this.fetchDetails(this.asteroidId);
  }

  // Function to reload the window
  reloadWindow() {
    window.location.reload();
  }

  // Call the service to fetch the details of the asteroid
  fetchDetails(asteroidId: string) {
    if (this.asteroidId) {
      this._asteroidsService.getAsteroidDetails(asteroidId)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to fetch Asteroid details. Please try again later.';
          console.error('Error fetching EPIC metadata:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      ).subscribe((response: AsteroidDetails) => {
        this.asteroidDetails = response;
        console.log(this.asteroidDetails);
      });
    }
  }
}
