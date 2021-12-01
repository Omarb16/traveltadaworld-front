import { ModalTripComponent } from './components/modal-trip/modal-trip.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TripComponent } from './components/trip/trip.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { TripListComponent } from './components/trip-list/trip-list.component';
import {ContactComponent} from "./components/contact/contact.component";
import {UserComponent} from "./components/user/user.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'user-card/:id', component: UserComponent, canActivate: [AuthGuard] },
  {
    path:'contact',
    component:ContactComponent,

  },

  { path: 'edit/:id', component: ModalEditComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'trip/:id',
    component: TripDetailComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'trips-list',
    component: TripListComponent,
  },
  {
    path: 'trips',
    component: TripComponent,
  },
  {
    path: 'create-trip',
    component: ModalTripComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-trip/:id',
    component: ModalTripComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
