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
  firstTime: boolean;
  notifs: Notification[];
  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService
  ) {
    this.contNotif = 0;
    this.firstTime = true;
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
        this.notifs = res;
        this.contNotif = 0;
        if (this.firstTime) {
          this.firstTime = false;
          this.notifs.forEach((e: any) => {
            const id = e.id;
            delete e.id;
            this._notificationService.update(id, e).subscribe(
              (res) => {},
              (err) => {
                console.error(err);
              }
            );
          });
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  delete(id: string) {
    this._notificationService.delete(id).subscribe(
      (res) => {
        this.notifs= this.notifs.filter((e) => e.id !== id);
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
