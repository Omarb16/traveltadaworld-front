import { AuthGuard } from './guards/auth.guard';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TripComponent } from './components/trip/trip.component';
import { UpdateComponent } from './components/update/update.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'profil', component: ProfilComponent },

  { path: 'edit/:id', component: UpdateComponent, canActivate: [AuthGuard] },
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
    path: 'trips',
    component: TripComponent,
  },
  {
    path: 'create-trip',
    component: TripFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-trip/:id',
    component: TripFormComponent,
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
