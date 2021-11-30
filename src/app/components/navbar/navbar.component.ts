import { Notification } from './../../types/notification.type';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  contNotif: number;
  notifs: Notification[];
  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService
  ) {
    this.contNotif = 0;
    this.notifs = [];
  }

  ngOnInit(): void {
    this._notificationService.count().subscribe(
      (res) => {
        this.contNotif = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  get userService() {
    return this._userService;
  }

  logOut() {
    this._userService.logOut();
  }

  openNotif() {
    this._notificationService.find().subscribe(
      (res) => {
        this.notifs = [];
      },
      (err) => {
        console.error(err);
      }
    );
    this.notifs.forEach((e) => {
      this._notificationService.seen(e.id, e).subscribe(
        (res) => {
          this.notifs = [];
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }
}
