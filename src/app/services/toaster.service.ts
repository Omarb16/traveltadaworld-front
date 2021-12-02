import { Notification } from './../types/notification.type';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _subject: BehaviorSubject<any>;
  private _toast$: Observable<any>;

  constructor() {
    this._subject = new BehaviorSubject<any>(null);
    this._toast$ = this._subject
      .asObservable()
      .pipe(filter((toast) => toast !== null));
  }

  show(data: Notification): void {
    this._subject.next({
      title: data.title,
      content: data.content,
      delay: 2000,
    });
  }

  get subject(): BehaviorSubject<any> {
    return this._subject;
  }

  get toast$(): Observable<any> {
    return this._toast$;
  }
}
