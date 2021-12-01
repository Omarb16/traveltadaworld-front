import { Notification } from './../types/notification.type';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  subject: BehaviorSubject<any>;
  toast$: Observable<any>;

  constructor() {
    this.subject = new BehaviorSubject<any>(null);
    this.toast$ = this.subject
      .asObservable()
      .pipe(filter((toast) => toast !== null));
  }

  show(data: Notification) {
    console.log(data);
    this.subject.next({
      title: data.title,
      content: data.content,
      delay: 2000,
    });
  }
}
