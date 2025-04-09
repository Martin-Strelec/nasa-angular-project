import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { AsteroidsService } from '../../services/asteroids.service';
import { Asteroids, Asteroid, NearEarthObjects } from '../../models/asteroids';
import { SimpleCacheService } from '../../services/simple-cache.service';

@Component({
  selector: 'app-asteroids',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './asteroids.component.html',
  styleUrl: './asteroids.component.css'
})
export class AsteroidsComponent implements OnInit {
  asteroids: Asteroid[] = [];
  neoData: Asteroid[] = [];
  startDate: string = '';
  endDate: string= '';
  errorMessage: string = '';

  constructor(private _asteroidsService: AsteroidsService, private simpleCache: SimpleCacheService) { }

  ngOnInit(): void {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    this.startDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    if (this.simpleCache.items.length && this.areItemsAsteroids(this.simpleCache.items)) {
      this.asteroids = this.simpleCache.items;
    }
    else {
      this.asteroids = []; // Initialize to an empty array if the cache is empty or invalid
      this.simpleCache.items = []; // Clear the cache if it's invalid
    }
  }

  reloadWindow() {
    window.location.reload();
  }

  private isAsteroid(item: any): item is Asteroid {
    return item && 
    typeof item.name === 'string' && 
    typeof item.nasa_jpl_url === 'string' &&
    typeof item.id === 'string' &&
    typeof item.is_potentially_hazardous_asteroid === 'boolean'
  } 

  private areItemsAsteroids(items: any[]): items is Asteroid[] {
    return items.every(item => this.isAsteroid(item));
  }

  loadData() {
    this.asteroids = []; // Clear the pictures array when the button is clicked
    this.simpleCache.items = []; // Clear the cache when the button is clicked
    this.simpleCache.sanitizedURLs = {}; // Clear the sanitized URLs cache
    this.getAsteroids(this.startDate, this.endDate); // Fetch data
  }

  extractAsteroids(neoObject: NearEarthObjects): Asteroid[] {
    this.neoData = [];
    return Object.values(neoObject).flat();
  }

  getAsteroids(startDate:string, endDate:string) {
    this._asteroidsService.getAsteroids(startDate, endDate)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to fetch EPIC images. Please try again later.';
          console.error('Error fetching EPIC metadata:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      ).subscribe((response: Asteroids) => {
        this.asteroids = this.extractAsteroids(response.near_earth_objects);
        this.simpleCache.items = this.asteroids; // Cache the data
        console.log(this.asteroids);
      });
  }
}
