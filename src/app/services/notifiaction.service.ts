import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../types/notification.type';

@Injectable({
  providedIn: 'root',
})
export class NotifiactionService {
  constructor(private _http: HttpClient) {}

  create(notification: Notification): Observable<Notification> {
    return this._http.post<Notification>(
      environment.apiUrl + 'notifications',
      notification
    );
  }

  find(id: string): Observable<Notification> {
    return this._http.get<Notification>(
      environment.apiUrl + 'notifications/' + id
    );
  }

  update(id: string, notification: FormData): Observable<Notification> {
    return this._http.put<Notification>(
      environment.apiUrl + 'notifications/' + id,
      notification
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(environment.apiUrl + 'notifications/' + id);
  }
}
