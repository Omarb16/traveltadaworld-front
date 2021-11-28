import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { TripComponent } from './components/trip/trip.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { MatInputModule } from '@angular/material/input';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NgxSpinnerModule } from '@hardpool/ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ProfilComponent } from './components/profil/profil.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpdateComponent } from './components/update/update.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SigninComponent,
    TripComponent,
    TripDetailComponent,
    TripFormComponent,
    ProfilComponent,
    UpdateComponent,
    DialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'yyyy-MM-ddTHH:mm:ss.SSSZ',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
        },
      },
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
