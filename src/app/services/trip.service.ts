import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trip } from '../types/trip.type';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private _http: HttpClient) {}

  find(id: string): Observable<Trip> {
    return this._http.get<Trip>(environment.apiUrl + '/trips/' + id);
  }

  findAll(): Observable<Trip> {
    return this._http.get<Trip>(environment.apiUrl + '/trips');
  }

  create(trip: Trip): Observable<Trip> {
    return this._http.post<Trip>(environment.apiUrl + '/trips', trip);
  }

  update(id: string, trip: Trip): Observable<Trip> {
    return this._http.put<Trip>(environment.apiUrl + '/trips/' + id, trip);
  }

  delete(id: string): Observable<Trip> {
    return this._http.delete<Trip>(environment.apiUrl + '/trips/' + id);
  }
}
