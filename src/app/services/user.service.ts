import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from './../types/notification.type';
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
import { AccessToken } from '../types/access-token.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUserSource: ReplaySubject<string | null>;
  private _countNotifSource: ReplaySubject<void>;
  private _currentUser$: Observable<string | null>;
  private _countNotif$: Observable<void>;
  private _isLoggedIn: boolean;
  private _countNotif: number;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _socketService: SocketService
  ) {
    this._currentUserSource = new ReplaySubject<string | null>(1);
    this._countNotifSource = new ReplaySubject<void>(1);
    this._currentUser$ = this._currentUserSource.asObservable();
    this._countNotif$ = this._countNotifSource.asObservable();
    this._isLoggedIn = false;
    this._countNotif = 0;
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this._socketService.subscribe();
      this._currentUserSource.next(localStorage.getItem('name'));
      this._countNotifSource.next();
      this._isLoggedIn = true;
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

  logOut(): void {
    this._socketService.unsubscribe();
    localStorage.removeItem('name');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    this._currentUserSource.next(null);
    this._isLoggedIn = false;
    this._router.navigate(['/']);
  }

  loggedIn(res: UserLogged): void {
    this.changeName(res.lastname + ' ' + res.firstname);
    localStorage.setItem('access_token', res.access_token);
    this._socketService.subscribe();
    this._isLoggedIn = true;
    this._countNotifSource.next();
    this._router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get countNotif$(): Observable<void> {
    return this._countNotif$;
  }

  get currentUser$(): Observable<string | null> {
    return this._currentUser$;
  }

  getIdUser(): string {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      return (<AccessToken>jwt_decode(accessToken)).sub;
    }
    return '';
  }

  delete(id: string): Observable<User> {
    return this._http.delete<User>(environment.apiUrl + 'users/delete/' + id);
  }

  changeName(name: string): void {
    localStorage.setItem('name', name);
    this._currentUserSource.next(name);
  }
}
