import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TripComponent } from './components/trip/trip.component';
import { FooterComponent } from './components/footer/footer.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfilComponent } from './components/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TripComponent,
    FooterComponent,
    TripDetailComponent,
    TripFormComponent,
    DashboardComponent,
    LoginComponent,
    SigninComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
