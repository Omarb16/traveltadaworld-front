import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  private _isLoading: BehaviorSubject<boolean>;

  constructor() {
    this._isLoading = new BehaviorSubject<boolean>(false);
  }

  get isLoading(): BehaviorSubject<boolean> {
    return this._isLoading;
  }
}
