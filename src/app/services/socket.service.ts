import { Notification } from './../types/notification.type';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(
    private _router: Router,
    private _toasterService: ToasterService
  ) {
    this.socket = io(environment.apiUrl);
    this.socket.on('sendNotiftoClient', (data: Notification) => {
      this.showToaster(data);
    });
  }

  sendNotif(data: Notification) {
    this.socket.emit('sendToServer', data);
  }

  subscribe() {
    this.socket.emit('subscribe', localStorage.getItem('access_token'));
  }

  unsubscribe() {
    this.socket.emit('unsubscribe', localStorage.getItem('access_token'));
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  showToaster(data: Notification) {
    this._toasterService.show(data.title, data.content);
  }
}
