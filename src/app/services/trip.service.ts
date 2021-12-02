import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TripDetail } from '../types/trip-detail.type';
import { Trip } from '../types/trip.type';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private _http: HttpClient) {}

  find(id: string): Observable<Trip> {
    return this._http.get<Trip>(environment.apiUrl + 'trips/find/' + id);
  }

  findDetail(id: string): Observable<TripDetail> {
    return this._http.get<TripDetail>(
      environment.apiUrl + 'trips/finddetail/' + id
    );
  }

  findAll(query: string): Observable<Trip[]> {
    return this._http.get<Trip[]>(environment.apiUrl + 'trips' + query);
  }

  findFirstTree(): Observable<Trip[]> {
    return this._http.get<Trip[]>(environment.apiUrl + 'trips/firsttree');
  }

  findTravelerTrips(query: string): Observable<Trip[]> {
    return this._http.get<Trip[]>(
      environment.apiUrl + 'trips/travelertrips' + query
    );
  }

  findUserTrips(query: string): Observable<Trip[]> {
    return this._http.get<Trip[]>(
      environment.apiUrl + 'trips/usertrips' + query
    );
  }

  findRecommandation(id: string): Observable<Trip[]> {
    return this._http.get<Trip[]>(
      environment.apiUrl + 'trips/recommandation/' + id
    );
  }
  countTravelerTrips(): Observable<number> {
    return this._http.get<number>(
      environment.apiUrl + 'trips/counttravelertrips'
    );
  }

  countUserTrips(): Observable<number> {
    return this._http.get<number>(environment.apiUrl + 'trips/countusertrips');
  }

  count(): Observable<number> {
    return this._http.get<number>(environment.apiUrl + 'trips/count');
  }

  create(trip: Trip): Observable<Trip> {
    return this._http.post<Trip>(environment.apiUrl + 'trips', trip);
  }

  update(id: string, trip: Trip): Observable<Trip> {
    return this._http.put<Trip>(
      environment.apiUrl + 'trips/update/' + id,
      trip
    );
  }

  delete(id: string): Observable<Trip> {
    return this._http.delete<Trip>(environment.apiUrl + 'trips/delete/' + id);
  }

  demand(id: string, body: any): Observable<Trip> {
    return this._http.put<Trip>(
      environment.apiUrl + 'trips/demand/' + id,
      body
    );
  }

  cancel(id: string): Observable<Trip> {
    return this._http.delete<Trip>(environment.apiUrl + 'trips/cancel/' + id);
  }

  accept(id: string, user: string): Observable<Trip> {
    return this._http.put<Trip>(environment.apiUrl + 'trips/accept/' + id, {
      id: user,
    });
  }

  decline(id: string, user: string): Observable<Trip> {
    return this._http.put<Trip>(environment.apiUrl + 'trips/decline/' + id, {
      id: user,
    });
  }
}
