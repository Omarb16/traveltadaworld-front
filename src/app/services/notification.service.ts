import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../types/notification.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _http: HttpClient) {}

  create(notification: Notification): Observable<Notification> {
    return this._http.post<Notification>(
      environment.apiUrl + 'notifications',
      notification
    );
  }

  find(): Observable<Notification[]> {
    return this._http.get<Notification[]>(
      environment.apiUrl + 'notifications/'
    );
  }

  seen(id: string, n: Notification): Observable<Notification> {
    return this._http.put<Notification>(
      environment.apiUrl + 'notifications/' + id,
      n
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(environment.apiUrl + 'notifications/' + id);
  }

  count(): Observable<number> {
    return this._http.get<number>(environment.apiUrl + 'notifications/count/');
  }
}
