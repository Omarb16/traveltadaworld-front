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

  signIn(user: User): Observable<AccessToken> {
    return this._http.post<AccessToken>(environment.apiUrl, user);
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return {
      headers: new HttpHeaders(
        Object.assign({ 'Content-Type': 'application/json' }, headerList)
      ),
    };
  }
}
