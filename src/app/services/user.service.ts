import { SocketService } from 'src/app/services/socket.service';
import { User } from '../types/user.type';
import { UserLogged } from '../types/user-logged.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../types/login-user.type';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AccessToken } from '../types/access-token.type ';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserSource = new ReplaySubject<string | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  isLoggedIn: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _socketService: SocketService
  ) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.currentUserSource.next(localStorage.getItem('name'));
      this.isLoggedIn = true;
      this._socketService.subscribe();
    }
  }

  signIn(user: FormData): Observable<UserLogged> {
    return this._http.post<UserLogged>(
      environment.apiUrl + 'users/signIn',
      user
    );
  }

  logIn(user: LoginUser): Observable<UserLogged> {
    return this._http.post<UserLogged>(
      environment.apiUrl + 'users/logIn',
      user
    );
  }

  update(id: string, user: FormData): Observable<User> {
    return this._http.put<User>(environment.apiUrl + 'users/' + id, user);
  }

  find(id: string): Observable<User> {
    return this._http.get<User>(environment.apiUrl + 'users/' + id);
  }

  logOut() {
    this._socketService.unsubscribe();
    localStorage.removeItem('name');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    this.currentUserSource.next(null);
    this.isLoggedIn = false;
    this._router.navigate(['/']);
  }

  loggedIn(res: UserLogged) {
    localStorage.setItem('name', res.lastname + ' ' + res.firstname);
    localStorage.setItem('access_token', res.access_token);
    this.currentUserSource.next(res.lastname + ' ' + res.firstname);
    this._socketService.subscribe();
    this.isLoggedIn = true;
    this._router.navigate(['/']);
  }

  getIdUser(): string {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      return (<AccessToken>jwt_decode(accessToken)).sub;
    }
    return '';
  }

  changeName(name: string) {
    localStorage.setItem('name', name);
    this.currentUserSource.next(name);
  }
}
