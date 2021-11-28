import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {ProfilComponent} from "./components/profil/profil.component";
import {TripComponent} from "./components/trip/trip.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profil', component: ProfilComponent   },
  {
    path: 'trips', component:    TripComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
