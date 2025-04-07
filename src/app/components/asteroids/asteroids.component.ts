import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AsteroidsService } from '../../services/asteroids.service';
import { Asteroids, Asteroid, NearEarthObjects } from '../../models/asteroids';

@Component({
  selector: 'app-asteroids',
  imports: [RouterModule, CommonModule],
  templateUrl: './asteroids.component.html',
  styleUrl: './asteroids.component.css'
})
export class AsteroidsComponent implements OnInit {
  asteroids: Asteroid[] = [];
  neoData: Asteroid[] = [];
  errorMessage: string = '';

  constructor(private _asteroidsService: AsteroidsService) { }

  ngOnInit() {
    this.getAsteroids();
  }

  reloadWindow() {
    window.location.reload();
  }

  extractAsteroids(neoObject: NearEarthObjects): Asteroid[] {
    this.neoData = [];
    return Object.values(neoObject).flat();
  }

  getAsteroids() {
    this._asteroidsService.getAsteroids("2015-12-10", "2015-12-11")
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch EPIC images. Please try again later.';
          console.error('Error fetching EPIC metadata:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      ).subscribe((response: Asteroids) => {
        this.asteroids = this.extractAsteroids(response.near_earth_objects);
        console.log(this.asteroids);
      });
  }
}
