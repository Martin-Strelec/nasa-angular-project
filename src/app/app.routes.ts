import { Routes } from '@angular/router';
import { ApodComponent } from './components/apod/apod.component';
import { AsteroidsComponent } from './components/asteroids/asteroids.component';
import { RoversComponent } from './components/rovers/rovers.component';
import { EpicComponent } from './components/epic/epic.component';
import { AsteroidDetailsComponent } from './components/asteroid-details/asteroid-details.component';
import { ApodDetailsComponent } from './components/apod-details/apod-details.component';
import { EpicDetailsComponent } from './components/epic-details/epic-details.component';

export const routes: Routes = [
 {path: "", component: ApodComponent},
 {path: "apod", component: ApodComponent},
 {path: "asteroids", component: AsteroidsComponent},
 {path: "rovers", component: RoversComponent},
 {path: "epic", component: EpicComponent},
 {path: "asteroid-details/:id", component: AsteroidDetailsComponent},
 {path: "apod-details/:date", component: ApodDetailsComponent},
 {path: "epic-details/:identifier", component: EpicDetailsComponent}
];
