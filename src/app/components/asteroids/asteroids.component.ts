import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { AsteroidsService } from '../../services/asteroids.service';
import { Asteroids, Asteroid, NearEarthObjects } from '../../models/asteroids';
import { AsteroidDetailsComponent } from "../asteroid-details/asteroid-details.component";

declare var bootstrap: any; // declare bootstrap for TS

@Component({
  selector: 'app-asteroids',
  imports: [RouterModule, CommonModule, FormsModule, AsteroidDetailsComponent],
  templateUrl: './asteroids.component.html',
  styleUrl: './asteroids.component.css'
})
export class AsteroidsComponent implements OnInit {
  // Properties
  asteroids: Asteroid[] = [];
  neoData: Asteroid[] = [];
  startDate: string = '';
  endDate: string = '';
  errorMessage: string = '';
  selectedAsteroid: Asteroid | undefined;

  @Output() onModalOpen: EventEmitter<string>;

  constructor(private _asteroidsService: AsteroidsService) {
    this.onModalOpen = new EventEmitter();
  }

  ngOnInit(): void {
    this.asteroids = []; // Initialize to an empty array
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    this.startDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.selectedAsteroid = undefined;
        console.log('Modal closed, asteroid cleared');
      });
    }
  }

  // Function to reload the window
  reloadWindow() {
    window.location.reload();
  }

  openModal(asteroid: Asteroid) {
    this.selectedAsteroid = asteroid;
    this.onModalOpen.emit(this.selectedAsteroid.id);
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Function to fetch Asteroids
  loadData() {
    this.asteroids = []; // Clear the pictures array when the button is clicked
    this.getAsteroids(this.startDate, this.endDate); // Fetch data
  }

  // Function to extract asteroids from the response object
  extractAsteroids(neoObject: NearEarthObjects): Asteroid[] {
    this.neoData = [];
    return Object.values(neoObject).flat();
  }

  // Calling AsteroidsService to get the asteroids
  getAsteroids(startDate: string, endDate: string) {
    this._asteroidsService.getAsteroids(startDate, endDate)
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
