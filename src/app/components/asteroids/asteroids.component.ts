import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  constructor(private _asteroidsService: AsteroidsService) { }

  ngOnInit() {
    this.getAsteroids();
  }

  extractAsteroids(neoObject: NearEarthObjects): Asteroid[] {
    this.neoData = [];
    return Object.values(neoObject).flat();
  }

  getAsteroids() {
    this._asteroidsService.getAsteroids("2015-12-10", "2015-12-11").subscribe((response: Asteroids) => {
      this.asteroids = this.extractAsteroids(response.near_earth_objects);
      console.log(this.asteroids);
    });
  }
}
