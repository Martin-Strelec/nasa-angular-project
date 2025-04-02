import { Routes } from '@angular/router';
import { ApodComponent } from './components/apod/apod.component';
import { AsteroidsComponent } from './components/asteroids/asteroids.component';
import { RoversComponent } from './components/rovers/rovers.component';
import { EpicComponent } from './components/epic/epic.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
 {path:"", component: AppComponent},
 {path:"/apod", component: ApodComponent},
 {path:"/asteroids", component: AsteroidsComponent},
 {path:"/rovers", component: RoversComponent},
 {path:"/epic", component: EpicComponent}

];
