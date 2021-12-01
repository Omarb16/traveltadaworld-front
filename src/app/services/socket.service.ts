import { Notification } from './../types/notification.type';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(private _toastrService: ToastrService, private _router: Router) {
    this.socket = io(environment.apiUrl);
    this.socket.on('sendNotiftoClient', (data: Notification) => {
      this.showtoaster(data);
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

  showtoaster(data: Notification) {
    this._toastrService
      .info(data.content, data.title)
      .onTap.pipe(take(1))
      .subscribe(() => this._router.navigate(['/profil']));
  }
}
