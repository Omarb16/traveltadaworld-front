import { User } from './../types/create-user.types';
import { AccessToken } from './../types/access-token.entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  signIn(user: FormData): Observable<AccessToken> {
    return this._http.post<AccessToken>(
      environment.apiUrl + '/users/signIn',
      user
    );
  }

  logIn(user: User): Observable<AccessToken> {
    return this._http.post<AccessToken>(
      environment.apiUrl + '/users/logIn',
      user
    );
  }

  update(id: string, user: FormData): Observable<AccessToken> {
    return this._http.put<AccessToken>(
      environment.apiUrl + '/users/' + id,
      user
    );
  }
}
