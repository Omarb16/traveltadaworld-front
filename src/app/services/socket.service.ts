import { Notification } from './../types/notification.type';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(private _toastrService: ToastrService) {
    this.socket = io(environment.apiUrl);
    this.socket.on('sendNotiftoClient', (data: Notification) => {});
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
}
