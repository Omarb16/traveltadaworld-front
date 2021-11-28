import { User } from '../types/user.type';
import { AccessToken } from '../types/access-token.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../types/login-user.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserSource = new ReplaySubject<string | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  isLoggedIn: boolean = false;

  constructor(private _http: HttpClient, private _router: Router) {
    const name = localStorage.getItem('name');
    if (name) this.currentUserSource.next(name);
  }

  signIn(user: User): Observable<AccessToken> {
    return this._http.post<AccessToken>(
      environment.apiUrl + 'users/signIn',
      user
    );
  }

  logIn(user: LoginUser): Observable<AccessToken> {
    return this._http.post<AccessToken>(
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
    localStorage.removeItem('name');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    this.currentUserSource.next(null);
    this.isLoggedIn = false;
    this._router.navigate(['/']);
  }

  loggedIn(res: AccessToken) {
    localStorage.setItem('name', res.lastname + ' ' + res.firstname);
    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('id', res.id);
    this.currentUserSource.next(res.lastname + ' ' + res.firstname);
    this.isLoggedIn = true;
    this._router.navigate(['/']);
  }
}
