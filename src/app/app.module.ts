import { environment } from './../environments/environment';
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
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { TripComponent } from './components/trip/trip.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { FormTripComponent } from './components/form-trip/form-trip.component';
import { MatInputModule } from '@angular/material/input';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NgxSpinnerModule } from '@hardpool/ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ProfilComponent } from './components/profil/profil.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { ModalTripComponent } from './components/modal-trip/modal-trip.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { DialogTripComponent } from './components/dialog-trip/dialog-trip.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserComponent } from './components/user/user.component';
import {MatSortModule} from '@angular/material/sort';
import { ToasterComponent } from './components/toaster/toaster.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DialogEditComponent,
    DialogTripComponent,
    FooterComponent,
    FormEditComponent,
    FormTripComponent,
    HomeComponent,
    LoginComponent,
    ModalEditComponent,
    ModalTripComponent,
    NavbarComponent,
    PageNotFoundComponent,
    ProfilComponent,
    SigninComponent,
    TripComponent,
    TripDetailComponent,
    TripListComponent,
    ContactComponent,
    UserComponent,
    ToasterComponent,
  ],
  imports: [
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
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
